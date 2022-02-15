import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomOrder from '../helpers/radomOrder';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      correctAnswer: '',
    };
  }

  componentDidMount() {
    const { question } = this.props;
    const arrQuestions = [...question.incorrect_answers, question.correct_answer];
    this.setAnswers(question.type, arrQuestions, question.correct_answer);
  }

  setAnswers = (type, arrQuestions, correctAnswer) => {
    this.setState({ answers: randomOrder(type, arrQuestions), correctAnswer });
  };

  render() {
    const { question } = this.props;
    const { answers, correctAnswer } = this.state;
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
            >
              {answer}
            </button>
          ))}
        </div>
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
