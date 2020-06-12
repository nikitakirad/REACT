import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux';
import {Button,Input, Segment,Header} from 'semantic-ui-react';
class Auth extends Component {
    state = {
        controls: {
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: true,  
            }
        }
    }
    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        console.log(isValid);

        return isValid;
    }

    inputChangedHandler = ( event) => {
        const updatedControls = {
            ...this.state.controls,
            [event.target.name]: {
                ...this.state.controls[event.target.name],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[event.target.name].validation )
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );
    }
    render () {


        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authredirect=null;
        if(this.props.isAuthenticated){
            authredirect=this.props.history.push('/');
        }
        let validationmsg=null;
        if(this.state.controls.email.valid===false || this.state.controls.password.valid===false){
            validationmsg=<p>Email must be in a@gmail.com format and password length must be 6 characters</p>
        }

        return (
            <div>
                {authredirect}
                <Segment textAlign="center" size="big">
                    {errorMessage}
                    {validationmsg}
                    <Header>Enter the login Details</Header>
                    <form onSubmit={this.submitHandler}>
                
                    <label>Email:</label><br></br>
                    <Input name="email" onChange={this.inputChangedHandler} /><br></br><br></br>
                    <label>Password:</label><br></br>
                    <Input type="password" name="password" onChange={this.inputChangedHandler} /><br></br><br></br>
                    <Button color="grey">LOGIN</Button>
                    
                    </form>
                
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        error: state.error,
        isAuthenticated: state.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
