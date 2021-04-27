import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createControl, validate, validateForm } from 'form/formFramework';
import Input from 'components/UI/Input/Input';
import Select from 'components/UI/Select/Select';
import { createQuizQuestion, finishCreateQuiz } from 'store/actions/create';
import Button from 'components/UI/Button/Button';
import classes from './QuizCreator.module.scss';

function createOptionControl(number) {
    return createControl(
        {
            label: `Option ${number}`,
            errorMessage: `Value can't be empty`,
            id: number
        },
        { required: true }
    );
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Input question',
                errorMessage: `Question can't be empty`,
                id: 0
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    };
}

const answersTemplate = [
    { text: 1, value: 1 },
    { text: 2, value: 2 },
    { text: 3, value: 3 },
    { text: 4, value: 4 }
];

class QuizCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            rightAnswerID: 1,
            formControls: createFormControls()
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const { formControls, rightAnswerID } = this.state;
        const { question, option1, option2, option3, option4 } = formControls;
        const { quiz, createQuestion } = this.props;

        const questionItem = {
            question: question.value,
            id: quiz.length + 1,
            rightAnswerID,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        };

        createQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerID: 1,
            formControls: createFormControls()
        });
    };

    createQuizHandler = (event) => {
        event.preventDefault();

        const { finishQuizCreation } = this.props;

        this.setState({
            isFormValid: false,
            rightAnswerID: 1,
            formControls: createFormControls()
        });

        finishQuizCreation();
    };

    changeHandler = (value, controlName) => {
        const { formControls: stateFormControls } = this.state;
        const formControls = { ...stateFormControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    };

    renderInputs() {
        const { formControls } = this.state;
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <React.Fragment key={control.id}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 && <hr />}
                </React.Fragment>
            );
        });
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerID: +event.target.value
        });
    };

    render() {
        const { rightAnswerID, isFormValid } = this.state;
        const { quiz } = this.props;

        const select = <Select label={'Choose right answer'} value={rightAnswerID} onChange={this.selectChangeHandler} options={answersTemplate} />;

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Test creating</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}

                        <Button type={'primary'} onClick={this.addQuestionHandler} disabled={!isFormValid}>
                            Add Question
                        </Button>

                        <Button type={'success'} onClick={this.createQuizHandler} disabled={quiz.length === 0}>
                            Create Quiz
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

QuizCreator.propTypes = {
    createQuestion: PropTypes.func,
    finishQuizCreation: PropTypes.func,
    quiz: PropTypes.arrayOf(PropTypes.any)
};

QuizCreator.defaultProps = {
    createQuestion: null,
    finishQuizCreation: null,
    quiz: null
};

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishQuizCreation: () => dispatch(finishCreateQuiz())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
