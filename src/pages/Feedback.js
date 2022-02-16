import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const NUMBER_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= NUMBER_ASSERTIONS ? 'Well Done!' : 'Could be better...' }
        </h1>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
