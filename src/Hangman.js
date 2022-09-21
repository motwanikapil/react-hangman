import React, { Component } from 'react'
import './Hangman.css'
import img0 from './0.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import { words } from './words'
import AlphaButtons from './AlphaButtons'

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  }

  constructor(props) {
    super(props)
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: words[Math.floor(Math.random() * words.length)],
      maxGuesses: this.props.maxWrong,
    }
    this.handleGuess = this.handleGuess.bind(this)
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'))
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }))
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ))
  }

  resetGame = () => {
    this.setState((curState) => {
      return {
        nWrong: 0,
        guessed: new Set(),
        answer: words[Math.floor(Math.random() * words.length)],
        maxGuesses: this.props.maxWrong,
      }
    })
  }

  isWinner() {
    return this.state.answer.split('') === this.state.guessed
  }
  /** render: render game */
  render() {
    const restart = (
      <button
        onClick={this.resetGame}
        style={{ width: '200px', height: '50px' }}
      >
        Restart Game
      </button>
    )
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={this.state.nWrong + ' / ' + this.state.maxGuesses}
        />
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.state.nWrong < this.state.maxGuesses ||
        this.state.guessed === this.state.answer ? (
          <AlphaButtons handleGuess={this.handleGuess} state={this.state} />
        ) : this.isWinner() ? (
          <p color={'green'}>You Win</p>
        ) : (
          <p color={'green'}>You Lose</p>
        )}
        <h4>Number of wrong guesses : {this.state.nWrong} </h4>
      </div>
    )
  }
}

export default Hangman
