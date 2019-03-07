import React, { Component } from 'react';
import './App.css';
const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: []
    }
    this.getPokemonList();

  }
  getPokemonList(){
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        this.setState({
          results: data.results
        });
      })
  }

  render() {
    return (
      <div className="App">
        holi
      </div>
    );
  }
}

export default App;
