import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, fetchToken } from '../services/fetchs';
import { updateToken } from '../redux/actions';

const RESQUEST_FAIL = 3;

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isLoading: true,
    };
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

  render() {
    const { questions, isLoading } = this.state;
    return (
      <>
        <Header />
        {isLoading ? <p>carregando...</p> : <Question question={ questions[0] } />}
      </>
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  getNewToken: PropTypes.func.isRequired,
};

const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = (dispatch) => ({
  getNewToken: (token) => dispatch(updateToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
