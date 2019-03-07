import React, { Component } from 'react';
import './App.css';
import {getPokemons} from './services/pokemonService';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: []
    }


  }

  componentDidMount(){
    
      getPokemons()
      .then(data => {
        this.setState({
          results: data.results
        });
      })
      .catch(err => console.log(err));
    
  }

  

  render() {
    return (
      <div className="App">
        <h1 className="app__tittle">Pokemon List</h1>
        <ul className="app__list">
          {this.state.results.map(item => {
            return (
              <li key={item.name} className="app__list-item">
                <div className="pokemon">
                  <h2 className="pokemon__name">{item.name}</h2>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
