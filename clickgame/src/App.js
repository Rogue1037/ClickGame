import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Item from "./components/Item";
import ships from "./ships.json";
import "./App.css";

class App extends Component {
   state = {
    score: 0,
    topScore: 0,
    maxScore: 8,
    message: "Pick your first ship to begin!",
    messageClass:"",
    ships: ships
  };

  shuffle = (array) => {
    
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

  }

  correctChoice = () => {

    if (this.state.score + 1 > this.state.topScore) {
      this.setState({topScore: this.state.topScore + 1})
    }
    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: this.state.score + 1, message: "You know you're ships!", messageClass: "Correct"})
    } else {
      this.setState({score: this.state.score + 1, message: "Pick your next ship, correct!!", messageClass: "Correct"})
    }

  } // close correctChoice

  wrongChoice = () => {

    this.setState({score: 0, message: "you already picked that ship!"})
    const updatedShips = this.state.ships.map(uc => uc.isClicked === (true) ? { ...uc, isClicked: false } : uc)
    return updatedShips

  }

  winReset = (currectShips) => {

    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0})
      const updatedShips = currectShips.map(uc => (true) ? { ...uc, isClicked: false} : uc)
        return updatedShips
    } else {
      return currectShips
    }

  } // close winReset

 
randomizeShips = (name) => {

var resetNeeded = false;
  const ships = this.state.ships.map(uc => {
    if(uc.name === name) {
      if (uc.isClicked === false) {
        this.correctChoice()
          return { ...uc, isClicked: true}
      } else {
        resetNeeded = true
        return { ...uc, isClicked: false}
      }
    }
    return uc
  })
  if (resetNeeded) {
  this.setState({
  ships: this.shuffle(this.wrongChoice()),
  messageClass:"incorrect"
  })
      
} else {
  this.setState({ ships: this.shuffle(this.winReset(ships)) })
}
    
} //close randomizeShips

  renderShips = () => {

  return this.state.ships.map((ship) =>
    <Item 
      image={ship.image} 
      name={ship.name} 
      key={ship.id} 
      onClick={this.randomizeShips} 
      />
  );
}

render() {
return (
  <div className="App">
  <Header />
  <Navbar
    score={this.state.score}
    topscore={this.state.topScore}
    message={this.state.message}
    messageClass={this.state.messageClass}
    />

        
  <div className="content">
    {this.renderShips()}
      </div>
    </div>

  );
}

}

export default App;
