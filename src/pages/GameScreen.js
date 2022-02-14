import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/fetchQuestions';
import Header from '../components/Header';

class GameScreen extends Component {
  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token } = this.props;
    console.log(await fetchQuestions(token));
  }

  render() {
    return (
      <Header />
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token }) => ({
  token,
});

export default connect(mapStateToProps)(GameScreen);
