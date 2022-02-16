import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { zeroScore } from '../redux/actions';

const NUMBER_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history, clearScore } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= NUMBER_ASSERTIONS ? 'Well Done!' : 'Could be better...' }
        </h1>
        <section>
          <p data-testid="feedback-total-score">
            {score}
          </p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            history.push('/');
            clearScore();
          } }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  clearScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearScore: () => dispatch(zeroScore()),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
