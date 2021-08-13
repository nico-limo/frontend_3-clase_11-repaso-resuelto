import React, { Component } from 'react'
import "../styles/Pokedex.css"

export default class Pokedex extends Component {
    constructor(){
        super();
        this.state = {
            filterPokemons : [],
            searched: "",
        }
    }

    componentDidMount(){
        this.setState({filterPokemons: this.props.pokemons})
      }


     getPokemon = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.props.updateParent({pokemon: [data.name, data.id, data.types]});
        })
        .catch(err => alert(err.message))
    }

    handleFilter = (event) => {
        this.setState({searched: event.target.value})
        const newArray = this.props.pokemons.filter((pokemon) =>pokemon.name.includes(this.state.searched))
        this.setState({filterPokemons: newArray})
    }

    handleClean = (event) => {
        event.preventDefault();
        this.setState({filterPokemons: this.props.pokemons, searched: ""})
    }

    render() {
        const {filterPokemons} = this.state;
        return (
            <div className="pokeContainer">
                <h3>POKEDEX</h3>
                <form className="pokeSearch">
                    <input onChange={this.handleFilter} type="text" placeholder="Filtra los pokemones" value={this.state.searched} />
                    <button onClick={this.handleClean}>Limpiar</button>
                </form>
                <div className="pokeList">
                    {filterPokemons.map(pokemon => (
                    <p key={pokemon.name} onClick={() => this.getPokemon(pokemon.url)} className="pokeOption">{pokemon.name}</p>
                    ))}
                </div>
            </div>
        )
    }
}

