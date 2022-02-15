import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      urlHash: '',
    };
    this.getAvatar = this.getAvatar.bind(this);
  }

  componentDidMount() {
    this.getAvatar();
  }

  getAvatar() {
    const { email } = this.props;
    const HASH = md5(email).toString();
    this.setState({ urlHash: HASH });
  }

  render() {
    const { player } = this.props;
    const { urlHash } = this.state;
    return (
      <header
        style={
          {
            background: '#247B7B',
            width: '100vw',
            height: '100px',
            display: 'flex' }
        }
      >
        <img src={ `https://www.gravatar.com/avatar/${urlHash}` } alt="avatar" data-testid="header-profile-picture" />
        <h6 data-testid="header-player-name">{player}</h6>
        <p data-testid="header-score">
          Score: 0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
