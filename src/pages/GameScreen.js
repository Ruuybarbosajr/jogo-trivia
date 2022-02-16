import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, fetchToken } from '../services/fetchs';
import { updateToken } from '../redux/actions';
// import Timer from '../components/Timer';
import './GameScreen.css';

const RESQUEST_FAIL = 3;

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isLoading: true,
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token, getNewToken } = this.props;
    const responseAPI = await fetchQuestions(token);
    if (responseAPI.response_code === RESQUEST_FAIL) {
      getNewToken(await fetchToken());
      this.getQuestions();
    } else this.setState({ questions: [...responseAPI.results], isLoading: false });
  }

  handleClick() {
    const { index } = this.state;
    const { history } = this.props;
    const QUATRO = 4;
    if (index === QUATRO) history.push('/feedback');
    this.setState((prevState) => ({
      index: prevState.index + 1,
      isLoading: true,
    }), () => this.setState({ isLoading: false }));
  }

  render() {
    const { questions, isLoading, index } = this.state;
    const { next } = this.props;
    return (
      <>
        <Header />
        {isLoading && <p>carregando...</p>}
        {!isLoading && <Question question={ questions[index] } />}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
          className={ next ? 'isVisible' : 'invisible' }
        >
          Next
        </button>
      </>
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  getNewToken: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ token, game }) => ({ token, next: game.next });
const mapDispatchToProps = (dispatch) => ({
  getNewToken: (token) => dispatch(updateToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
