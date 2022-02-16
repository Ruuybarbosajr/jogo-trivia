import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text"> Se aparece é porque funciona</h1>
      </>
    );
  }
}

export default Feedback;
