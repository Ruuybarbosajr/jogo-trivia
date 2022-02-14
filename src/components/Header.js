import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <header
        style={ { background: '#247B7B', width: '100vw', height: '100px' } }
      >
        {/* tag de imagem para a foto do user */}
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
};

const mapStateToProps = (state) => ({
  player: state.player.name,
});

export default connect(mapStateToProps)(Header);
