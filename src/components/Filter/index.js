import React, { Component } from 'react';

class Filter extends Component {
    render() { 
        const {getQuery} = this.props;
        return (
            <div className="app__filter">
                <input type="text"
                    className="app__input"
                    placeholder="Search Pokemons by name"
                    onChange={getQuery}
                />
            </div>
        );
    }
}

export default Filter;