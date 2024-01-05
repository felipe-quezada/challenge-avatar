import { CardPokemon, Loading } from './';
import { PokemonContext } from '../context/PokemonContext';
import { useContext } from 'react';

export const PokemonList = () => {
  const { pokemonList, loading, loadMorePokemons, filteredPokemons } =
    useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <Loading />
      ) : filteredPokemons.length > 0 ? (
        <>
          <ul className="flex flex-wrap justify-center mt-10 gap-10">
            {filteredPokemons.map((pkm) => {
              return <CardPokemon pkm={pkm} key={pkm.id} />;
            })}
          </ul>
        </>
      ) : (
        <>
          <ul className="flex flex-wrap justify-center mt-10 gap-10">
            {pokemonList.map((pkm) => {
              return <CardPokemon pkm={pkm} key={pkm.id} />;
            })}
          </ul>
          <div className="w-full text-center mt-8">
            <button
              onClick={loadMorePokemons}
              className="w-1/4 h-28 bg-orange-300 border-2 border-gray-500 hover:bg-orange-400 rounded-2xl"
            >
              Más Pokemons
            </button>
          </div>
        </>
      )}
    </>
  );
};
