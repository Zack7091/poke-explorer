import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
