import React, {Component} from "react";
import Store from "./../StoreProvider";
import {connect} from "react-redux";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

class SearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    onChange = (event, {newValue, method}) => {
        let value = newValue;
        this.setState({value: newValue});
    }

    onSuggestionsFetchRequested = ({value}) => {
        if (value && value.length > 0) {
            window.getSuggestions(value).then((predictions)=>{
                Store.dispatch({
                    type: 'suggestions_fetched',
                    payload: predictions.map(item => {
                        return ({name: item})
                    })
                }); 
            })
        }
    }

    onSuggestionsClearRequested = () => {
        Store.dispatch({
            type: 'empty_list',
        });
    }
    renderSuggestion(suggestion, { query }) {
        const suggestionText = `${suggestion.name}`;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);
        return (
          <span className={'suggestion-content ' + suggestion.twitter}>
            <span className="name">
              {
                parts.map((part, index) => {
                  const className = part.highlight ? 'highlight' : null;
                  return (
                    <span className={className} key={index}>{part.text}</span>
                  );
                })
              }
            </span>
          </span>
        );
    }

    render() {
        if(typeof window == 'undefined'){
            return null
        }
        const {suggestions} = this.props;
        const {value} = this.state;
        const inputProps = {
            placeholder: "Search",
            value,
            onChange: this.onChange
        };
        return (
            <div className="pt-4">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => { return ((suggestion && suggestion.name)?suggestion.name:'')}}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={section => <strong>{section.title}</strong>}
                    getSectionSuggestions={section => section.item}
                    inputProps={inputProps}
                />
            </div>
        );
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (this.props !== nextProps) {
            let newSuggestions = [];
            let {suggestions} = nextProps;
            if (suggestions.length) { 
                newSuggestions.push({
                    title: "suggestions",
                    item: suggestions
                })
            }
            this.setState({suggestions: newSuggestions})
        }
    }

}

SearchField.propTypes = {};
SearchField.defaultProps = {};

function mapStateToProps(state) {
    return {
        suggestions: state.suggestions.suggestions,
    }
}

export default connect(mapStateToProps)(SearchField);
