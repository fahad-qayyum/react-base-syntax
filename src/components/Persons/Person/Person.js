import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './Person.css';
import styled from 'styled-components';
import AuthContext from "../../../context/auth-context"

class Person extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.value = "hello";
    }

    render() {

        const DivTag = styled.div`
          @media (min-width: 500px) {
            background-color: yellow;
          };
          background-color: white;
        `;

        return (
            <DivTag className="Person">
                <AuthContext.Consumer>{
                    context => context.isAuthenticated ? <p>"Logged in"</p> : <p>"Logged out"</p>
                }</AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" ref={this.inputRef} onChange={this.props.changed} value={this.props.name}/>
            </DivTag>
        )
    }
}


Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}
export default Person;
