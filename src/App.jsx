import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = await Promise.all(
        response.data.results.map(async (poke) => {
          const pokeDetails = await axios.get(poke.url);
          return pokeDetails.data;
        })
      );
      setPokemon(pokemonData);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={handleSearch}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            <img src={poke.sprites.front_default} alt={poke.name} />
            <h2>{poke.name}</h2>
            <p>ID: {poke.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
