import { capitalizeText } from '../helpers/capitalizeText';
import { fetchPkmChain } from '../services/pokemonServices';
import { Loading, EvolutionChain } from '../components';
import { PokemonContext } from '../context/PokemonContext';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import defaultPkm from '../assets/defaultPkm.png';

const initState = {
  loading: true,
  pokemonData: [],
  chainEvolution: [],
};

export const PokemonPage = () => {
  const { getPokemonById } = useContext(PokemonContext);
  const [pkm, setPkm] = useState(initState);
  const { id } = useParams();

  const getChainEvolution = async (id) => {
    const data = await fetchPkmChain(id);
    setPkm((state) => {
      return {
        ...state,
        loading: false,
        chainEvolution: data,
      };
    });
  };

  const getPokemon = async (id) => {
    const data = await getPokemonById(id);
    setPkm((state) => {
      return {
        ...state,
        pokemonData: data,
      };
    });
  };

  useEffect(() => {
    getPokemon(id);
    getChainEvolution(id);
  }, [id]);

  return (
    <main className="text-center">
      {pkm.loading ? (
        <Loading />
      ) : (
        <section className={`flex flex-col items-center p-4 space-y-10 text-`}>
          <div
            className={`${pkm.pokemonData.types[0].type.name} rounded-full shadow-2xl w-[470px] h-[470px]`}
          >
            <img
              src={
                pkm.pokemonData.sprites.other['official-artwork']
                  .front_default || defaultPkm
              }
              alt={pkm.pokemonData.name}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-6xl font-bold">
              {capitalizeText(pkm.pokemonData.name)}
            </h1>
            <div className="h-10"></div>
            <section className="border-4 rounded-xl border-gray-500 w-1/2 p-6">
              <h4 className="text-4xl font-bold">Datos del Pokemon</h4>
              <br />
              <ul className="text-left">
                <li>
                  <strong>Numero Pokemon internacional: </strong>
                  {pkm.pokemonData.id}
                </li>
                <li>
                  <strong>Peso: </strong>
                  {pkm.pokemonData.weight} g
                </li>
                <strong>Stats</strong>
                <ul>
                  {pkm.pokemonData.stats.map((stat) => {
                    return (
                      <li key={stat.stat.name}>
                        <strong>{stat.stat.name}: </strong>
                        {stat.base_stat}
                      </li>
                    );
                  })}
                </ul>
              </ul>
            </section>
          </div>
          <div className="border-4 rounded-xl w-1/2 m-auto p-6">
            <h4 className="text-4xl font-bold">Cadena Evolutiva</h4>
            <div className="flex justify-center my-10 gap-4">
              {pkm.chainEvolution.map((poke) => {
                return (
                  <NavLink to={`/pokemon/${poke.id}`} key={poke.id}>
                    <EvolutionChain
                      type={pkm.pokemonData.types[0].type.name}
                      url={poke.imageUrl}
                      name={poke.name}
                      pkmId={poke.id}
                    />
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
