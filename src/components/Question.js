import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomOrder from '../helpers/radomOrder';
import './Questions.css';

const ONE_SECOND = 1000;

class Question extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      correctAnswer: '',
      isStyled: false,
      timer: 30,
      isDisabled: false,
      setIntervalId: null,
    };
    this.setColors = this.setColors.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
  }

  componentDidMount() {
    const setIntervalId = setInterval(() => this.setState((prevState) => (
      { timer: prevState.timer - 1, setIntervalId })), ONE_SECOND);
    const { question } = this.props;
    const arrQuestions = [...question.incorrect_answers, question.correct_answer];
    this.setAnswers(question.type, arrQuestions, question.correct_answer);
  }

  componentDidUpdate(_prevProp, prevState) {
    if (prevState.timer === 1) {
      clearInterval(prevState.setIntervalId);
      this.setDisabled();
    }
  }

  setDisabled = () => {
    this.setState({ isDisabled: true });
  };

  setAnswers = (type, arrQuestions, correctAnswer) => {
    this.setState({ answers: randomOrder(type, arrQuestions), correctAnswer });
  };

  setColors(answer) {
    const { correctAnswer } = this.state;
    if (correctAnswer === answer) {
      return 'correctAnswer';
    }
    return 'wrongAnswer';
  }

  handleStyle() {
    this.setState({
      isStyled: true,
    });
  }

  render() {
    const { question } = this.props;
    const { answers, correctAnswer, isStyled, isDisabled, timer } = this.state;
    return (
      <section>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              key={ answer }
              data-testid={ answer === correctAnswer
                ? 'correct-answer'
                : `wrong-answer-${index}` }
              onClick={ this.handleStyle }
              className={ isStyled ? this.setColors(answer) : '' }
              disabled={ isDisabled }
            >
              {answer}
            </button>
          ))}
        </div>
        <section>
          TEMPO:
          {' '}
          {timer}
        </section>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.any).isRequired,
    correct_answer: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
