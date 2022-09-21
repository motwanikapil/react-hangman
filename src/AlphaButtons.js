import React, { Component } from 'react'

export default class AlphaButtons extends Component {
  render() {
    const { handleGuess, state } = this.props

    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button
        value={ltr}
        onClick={() => handleGuess(ltr)}
        disabled={state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ))
  }
}
