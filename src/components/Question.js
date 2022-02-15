import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import randomOrder from '../helpers/radomOrder';
import { updateScore } from '../redux/actions';
import './Questions.css';

const ONE_SECOND = 1000;
const SCORE_BOARD = { hard: 3, medium: 2, easy: 1 };
const SCORE_RIGHT_ANSWER = 10;

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
    this.handleClick = this.handleClick.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
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

  saveLocalStorage() {
    const { name, score, picture } = this.props;
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify(
        [{ name, score, picture }],
      ));
    } else {
      const prevRanking = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify(
        [...prevRanking, { name, score, picture }],
      ));
    }
  }

  handleClick(target) {
    this.setState({
      isStyled: true,
    });
    const answer = target.getAttribute('data-testid');
    if (answer === 'correct-answer') {
      const { question, sendScore } = this.props;
      const { timer } = this.state;
      const totalPoints = SCORE_RIGHT_ANSWER + (timer * SCORE_BOARD[question.difficulty]);
      sendScore(totalPoints);
      this.saveLocalStorage();
    }
    this.saveLocalStorage();
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
              onClick={ (event) => this.handleClick(event.target) }
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
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendScore: (totalPoints) => dispatch(updateScore(totalPoints)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.picture,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
