import React, {PureComponent} from 'react'
import Person from "./Person/Person";

class Persons extends PureComponent {

    // No need for this when extending from PureComponent
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    // componentWillUpdate() {
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    // anything that need to run before the component will be removed from DOM
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    key={person.id} name={person.name} age={person.age}
                        click={() => this.props.clicked(index)}
                        changed={(event) => this.props.changed(event, person.id)}
                />
            );
        });
    }
}

export default Persons;
