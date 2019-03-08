import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PokeList extends Component {

    render() {
        const {filterPokemons} = this.props;
        if(filterPokemons.length === 0){
            return <p>No matched results. Try to catch another pokemon</p>
        } else {
            return (
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
            );
        }
        
    }
}


PokeList.propTypes = {
    filterPokemons: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default PokeList;