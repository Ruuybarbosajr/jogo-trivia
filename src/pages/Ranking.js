import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { zeroScore } from '../redux/actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.getRankingFromLocalSt = this.getRankingFromLocalSt.bind(this);
  }

  componentDidMount() {
    this.getRankingFromLocalSt();
  }

  getRankingFromLocalSt() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking,
    });
  }

  render() {
    const { history, clearScore } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title"> se aparece é porque funciona</h1>
        <ul>
          {ranking.sort((a, b) => b.score - a.score).map((player, index) => (
            <li key={ player.picture }>
              <img src={ player.picture } alt="player avatar" />
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
            clearScore();
          } }
        >
          Play Again
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  clearScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearScore: () => dispatch(zeroScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
