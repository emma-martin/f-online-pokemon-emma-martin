import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class PokeList extends Component {

    render() {
        const {filterPokemons} = this.props;
        if(filterPokemons.length === 0){
            return <p>No matched results. Try to catch another pokemon</p>
        } else {
            return (
                <ul className="list">
                    {filterPokemons.map((item, index) => {
                        return (
                            <li key={index} id={item.id} className="list-item">
                                <div className="pokemon__container">
                                    <div className="pokemon__bg">
                                        <img src={item.img} alt={item.name} />
                                        <span className="pokemon__id">ID/{item.id}</span>
                                    </div>
                                    <div className="pokemon__info">
                                        <h2 className="pokemon__name">{item.name}</h2>
                                            {item.type.map((type, index) => {
                                                return (
                                                    <span key={index} className="pokemon__types">{type}</span>
                                                );
                                            })}
                                    </div>
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