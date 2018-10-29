import React, {Component} from "react";
import "./App.css";
import SearchField from "./components/SearchField";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Thoughtspot</h1>
                </header>
                <p className="App-intro">
                    Search Your text
                </p>
                <SearchField />
                <footer className="footer">
                    <p>Developed by: <a target="_blank" href="https://www.linkedin.com/in/prashant772/">Prashant
                        Singh</a></p>
                    <p>Contact information: <a href="mailto:singhprashant0608@gmail.com">singhprashant0608@gmail.com</a>.
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;
