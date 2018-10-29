import {combineReducers} from "redux";
import suggestionsReducers from "./SuggestionsReducers";

const allReducers = combineReducers({
    suggestions: suggestionsReducers,
});

export default allReducers;
