
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
    const pokeData = localStorage.getItem('pokeData');
    if(!pokeData){
      console.log('NOPOKE');
      // this.setState({
      //   pokemons: []
      // })
      this.fetchPokemons();
    }
    else {
      console.log('SIPOKE');
      this.setState({
        pokemons: JSON.parse(pokeData)
      })
    }
  }

  fetchPokemons = () =>{
    getPokemons()
      .then(data => {
        console.log('FEEEEEEETCHING');
        const pokeUrl = data.results.map(item => {
          return item.url;
        });
        const pokeArr = [];
        for (let i = 0; i < pokeUrl.length; i++) {
          fetch(pokeUrl[i])
            .then(response => response.json())
            .then(dataUrl => {
              const pokemon = {
                name: dataUrl.name,
                id: dataUrl.id,
                img: dataUrl.sprites.front_default,
                type: this.getPokeTypes(dataUrl.types)
              };
              pokeArr.push(pokemon);
              this.setState({
                pokemons: pokeArr
              });
              this.setLocalStorage(pokeArr);
            });
        }
        
      })
      .catch(err => console.log(err));
  }

  getPokeTypes(dataPokeTypes){
    const pokeTypeNames = [];
    for (let j = 0; j < dataPokeTypes.length; j++) {
      pokeTypeNames.push(dataPokeTypes[j].type["name"]);
    }
    return pokeTypeNames;
  }

  setLocalStorage(data){
    localStorage.setItem('pokeData', JSON.stringify(data));
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
            {pokemons.map((item, index) => {
              return (
                <li key={index} id={item.id} className="app__list-item">
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
