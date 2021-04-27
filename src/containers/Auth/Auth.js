import React, { Component } from 'react';
import is from 'is_js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import { auth } from 'store/actions/auth';
import classes from './Auth.module.scss';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormValid: false,
            formControls: {
                email: {
                    id: 0,
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Input valid email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    id: 1,
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Input valid password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        };
    }

    loginHandler = () => {
        const { formControls } = this.state;
        const { authUser } = this.props;

        authUser(formControls.email.value, formControls.password.value, true);
    };

    registerHandler = () => {
        const { formControls } = this.state;
        const { authUser } = this.props;

        authUser(formControls.email.value, formControls.password.value, false);
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const { formControls: stateFormControls } = this.state;

        const formControls = { ...stateFormControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid
        });
    };

    renderInputs = () => {
        const { formControls } = this.state;

        return Object.keys(formControls).map((controlName) => {
            const control = formControls[controlName];
            return (
                <Input
                    key={control.id}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        });
    };

    render() {
        const { isFormValid } = this.state;
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        <Button type={'success'} onClick={this.loginHandler} disabled={!isFormValid}>
                            Login
                        </Button>
                        <Button type={'primary'} onClick={this.registerHandler} disabled={!isFormValid}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

Auth.propTypes = {
    authUser: PropTypes.func
};

Auth.defaultProps = {
    authUser: null
};

function mapDispatchToProps(dispatch) {
    return {
        authUser: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    };
}

export default connect(null, mapDispatchToProps)(Auth);
