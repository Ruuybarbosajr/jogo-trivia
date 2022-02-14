import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      player: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.handleButton);
  }

  handleButton() {
    const { player, email } = this.state;
    const okFields = player && email !== '';
    console.log(okFields);
    this.setState({
      isDisabled: !okFields,
    });
  }

  render() {
    const { player, email, isDisabled } = this.state;
    return (
      <main>
        <form>
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
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
