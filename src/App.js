import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchFilter from './components/SearchFilter';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await res.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const detail = await res.json();
          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites.front_default,
            types: detail.types.map((t) => t.type.name),
          };
        })
      );
      setPokemons(pokemonDetails);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch Pokémon');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const allTypes = [...new Set(pokemons.flatMap(p => p.types))];

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedType ? pokemon.types.includes(selectedType) : true)
  );

  return (
    <div className="App">
      <Header />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        types={allTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredPokemons.length === 0 && <p>No Pokémon found.</p>}

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
