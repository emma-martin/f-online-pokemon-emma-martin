import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    render() { 
        const {getQuery, nameValue} = this.props;
        return (
            <div className="app__filter">
                <input 
                    type="text"
                    className="app__input"
                    placeholder="Search Pokemons by name"
                    onChange={getQuery}
                    value={nameValue}
                />
            </div>
        );
    }
}



Filter.propTypes = {
    getQuery: PropTypes.func.isRequired,
    nameValue: PropTypes.string.isRequired
}


export default Filter;
