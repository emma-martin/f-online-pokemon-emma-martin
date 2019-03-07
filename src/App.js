import React, { Component } from 'react';
import './App.css';
import {getPokemons} from './services/pokemonService';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: []
    }
    this.getPokemonList();

  }
  getPokemonList(){
      getPokemons()
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
