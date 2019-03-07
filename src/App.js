import React, { Component } from "react";
import "./App.scss";
import { getPokemons } from "./services/pokemonService";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  componentDidMount() {
    getPokemons()
      .then(data => {
        const pokeUrl = data.results.map(item => {
          return item.url;
        });
        for (let i = 0; i < pokeUrl.length; i++) {
          fetch(pokeUrl[i])
            .then(response => response.json())
            .then(dataUrl => {
              const pokeType = [];
              for (let j = 0; j < dataUrl.types.length; j++) {
                pokeType.push(dataUrl.types[j].type["name"]);
              }
              const pokemon = {
                name: dataUrl.name,
                id: dataUrl.id,
                img: dataUrl.sprites.front_default,
                type: pokeType
              };
              const pokeArr = this.state.pokemons;
              pokeArr.push(pokemon);
              this.setState({
                pokemons: pokeArr
              });
            });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { pokemons } = this.state;
    return (
      <div className="App">
        <header className="header">
          <h1 className="app__tittle">Pokemon List</h1>
        </header>
        <main className="main">
          <ul className="app__list">
            {pokemons.map(item => {
              return (
                <li key={item.id} className="app__list-item">
                  <div className="pokemon">
                    <img src={item.img} alt={item.name} />
                    <div className="pokemon__id">ID / {item.id}</div>
                    <h2 className="pokemon__name">{item.name}</h2>
                    {item.type.map((type, index) => {
                      return (
                          <span key={index} className="pokemon__types">{type}</span>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
        
      </div>
    );
  }
}

export default App;
