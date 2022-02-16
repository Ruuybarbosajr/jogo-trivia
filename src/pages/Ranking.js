import React from 'react';
import PropTypes from 'prop-types';

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
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title"> se aparece é porque funciona</h1>
        <ul>
          {ranking.sort((a, b) => b.score - a.score).map((player, index) => (
            <li key={ player.name }>
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
          onClick={ () => history.push('/') }
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
};

export default Ranking;
