
import React, { Component } from "react";
import "./App.scss";
import { getPokemons } from "./services/pokemonService";
import Filter from "./components/Filter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      query: ''
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


  getQuery = (event) => {
    const userQuery = event.currentTarget.value;
    this.setState({
      query: userQuery
    });
  }

  filterQuery = () => {
    const filteredPokemons = this.state.pokemons.filter(item =>{
      const pokeName = item.name;
      return pokeName.includes(this.state.query.toLowerCase());
    });
    return filteredPokemons;
  }


  render() {
    const filterPokemons = this.filterQuery();
    return (
      <div className="App">
        <header className="app__header">
          <div className="app__header-container">
            <h1 className="app__tittle">Pokemon List</h1>
            <Filter getQuery={this.getQuery}/>
          </div>
          
        </header>
        <main className="main">
          <ul className="app__list">
            {filterPokemons.map((item, index) => {
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
