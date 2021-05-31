import React, {Component} from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass';
import AuthContext from "../context/auth-context";

class App extends Component {

    state = {
        persons: [
            {id: '123', name: 'Max', age: 28},
            {id: '122', name: 'Manu', age: 29},
            {id: '133', name: 'Stephanie', age: 26}
        ],
        otherState: 'some other value',
        showPerson: false,
        showCockpit: true,
        characterCounter: 0,
        authState: false
    }

    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    // deprecated lifecycle hook

    // componentWillMount() {
    //   console.log('[App.js] componentWillMount');
    // }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    componentWillUnmount() {
        console.log('[App.js] componentWillUnmount');
    }

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {name: newName, age: 28},
                {name: 'Manu', age: 29},
                {name: 'Stephanie', age: 27}
            ]
        })
    }


    showPersonHandler = () => {
        this.setState({
            showPerson: !this.state.showPerson
        })
    }

    deletePersonHandler = (index) => {
        const persons = [...this.state.persons]
        persons.splice(index, 1)
        this.setState({
            persons: persons,
        })
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const targetPerson = {...this.state.persons[personIndex]}
        targetPerson.name = event.target.value
        let persons = [...this.state.persons]
        persons[personIndex] = targetPerson
        this.setState((prevState, props) => {
            return {
                persons: persons,
                characterCounter: prevState.characterCounter + 1
            }
        });
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPerson;
        this.setState({showPerson: !doesShow});
    };

    authHandler = () => {
        this.setState((prevState, props) => {
            return {
                authState: !prevState.authState
            }
        })
    }

    render() {
        let persons = null

        if (this.state.showPerson) {
            persons = (
                <Persons
                    isAuthenticated={this.state.authState}
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    characterCounter={this.state.characterCounter}
                />
            )
        }

        return (
            <WithClass classes="App">
                <button
                    onClick={() => {
                        this.setState({showCockpit: false});
                    }}
                >
                    Remove Cockpit
                </button>
                <AuthContext.Provider value={{
                    isAuthenticated: this.state.authState,
                    login: this.authHandler
                }}>
                    {this.state.showCockpit ? (
                        <Cockpit
                            title={this.props.appTitle}
                            personLength={this.state.persons.length}
                            showPerson={this.state.showPerson}
                            toggleClick={this.togglePersonsHandler}
                        />
                    ) : null}
                    {persons}
                </AuthContext.Provider>

            </WithClass>
        );
    }
}

export default App;
