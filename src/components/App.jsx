import React, { Component } from 'react'
import "../styles/App.css"
import Pokedex from './Pokedex';
import pokeList from "../pokedex.json"

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      pokemons: [], 
      loading: false
    }
  }

  update = (pokemon) => this.setState(pokemon)

  
  componentDidMount(){
    this.setState({loading: true, pokemons: pokeList})
  }

  componentWillUnmount(){
    this.setState({loading: false, pokemon: {}})
  }


  getPokemon = () => {
    const {pokemon} = this.state;
      if (this.state.pokemon.id?.toString()?.length === 1) return `00${pokemon.id}`
      if (this.state.pokemon.id?.toString()?.length === 2) return `0${pokemon.id}`
      if (this.state.pokemon.id?.toString()?.length === 3) return `${pokemon.id}`
  }

  getTypes = () => {
    let phrase;
    const {pokemon} = this.state;
    if(pokemon.type.length === 1) return pokemon.type[0]
    if(pokemon.type.length > 1) {
      for (let index = 0; index < pokemon.type.length; index++) {
        if(index === 0) phrase = pokemon.type[index]
        if(index !== 0) phrase = `${phrase} and ${pokemon.type[index]}`
      }
      return phrase
    }
  }

  render() {
    const {loading, pokemons, pokemon} = this.state;
    return loading ? (
      <div style={{display:"flex"}}>
      <div className="container">
        { pokemon.id ? 
        (
          <>
           <img id="pokemonImg" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getPokemon()}.png`} alt={pokemon.name} />
            <p id="name">{`${pokemon.name} is a pokemon type ${this.getTypes()}`}</p>
          </>
        ) : null
        }
      </div>
      <Pokedex updateParent={this.update} pokemons={pokemons} />
    </div>
    ) : null
  }
}


