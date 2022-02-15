import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { playerLoginInputs, getToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      player: '',
      email: '',
      isDisabled: true,
      isLogged: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.handleButton);
  }

  handleButton() {
    const { player, email } = this.state;
    const okFields = player && email !== '';
    this.setState({
      isDisabled: !okFields,
    });
  }

  handleClick() {
    const { playerInfo } = this.props;
    const { player, email } = this.state;
    const { playerToken } = this.props;
    playerInfo({ player, email });
    playerToken();
    this.setState({
      isLogged: true,
    });
  }

  render() {
    const { player, email, isDisabled, isLogged } = this.state;
    const { history } = this.props;
    if (isLogged) return <Redirect to="/game" />;
    return (
      <main>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
          } }
        >
          <label htmlFor="name-input">
            <input
              type="text"
              data-testid="input-player-name"
              name="player"
              id="name-input"
              value={ player }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email-input">
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => {
            history.push('/options');
          } }
        >
          Configurações
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  playerInfo: PropTypes.func.isRequired,
  playerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (info) => dispatch(playerLoginInputs(info)),
  playerToken: () => dispatch(getToken()),
});

export default connect(null, mapDispatchToProps)(Login);
