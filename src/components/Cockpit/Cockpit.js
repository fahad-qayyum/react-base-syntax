import React, {useEffect, useRef} from 'react'
import styled from "styled-components";
import './Cockpit.css';
import AuthContext from "../../context/auth-context"
const SwitchBtn = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid white;
  padding: 8px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
  }
`;

const LoginBtn = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid white;
  padding: 8px;
  cursor: pointer;
  outline: none;
`;

const cockpit = props => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request...
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });
    let classes = [];
    if (props.personLength <= 2) {
        classes.push('red')
    }
    if (props.personLength <= 1) {
        classes.push('bold')
    }
    return (
        <div>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <SwitchBtn ref={toggleBtnRef} alt={props.showPerson} onClick={props.toggleClick}>
                Switch Name
            </SwitchBtn>
            <AuthContext.Consumer>
                {
                    (context)=> {
                        return (
                            <LoginBtn alt={context.isAuthenticated} onClick={context.login}>
                                {context.isAuthenticated ? "Log out" : "Log in"}
                            </LoginBtn>
                        )
                    }
                }
            </AuthContext.Consumer>

        </div>
    )
}

export default cockpit;
