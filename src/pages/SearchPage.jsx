import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';

export const SearchPage = () => {
  const location = useLocation();
  const { allPokemonList } = useContext(PokemonContext);
  const filteredPokemon = allPokemonList.filter((pokemon) =>
    pokemon.name.includes(location.state.toLowerCase())
  );

  console.log(filteredPokemon);

  return (
    <>
      <p className="text-center text-3xl font-semibold">
        Se encontraron <span>{filteredPokemon.length} pokemons: </span>
      </p>
      <ul className="flex flex-wrap justify-center mt-10 gap-10">
        {filteredPokemon.map((pkm) => {
          return <CardPokemon pkm={pkm} key={pkm.id} />;
        })}
      </ul>
    </>
  );
};
