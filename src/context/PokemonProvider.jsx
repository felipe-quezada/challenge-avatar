import { fetchAllPkm, fetchPkmById } from '../services/pokemonServices';
import { PokemonContext } from './PokemonContext';
import { useForm } from '../hooks/useForms';
import { useEffect, useState } from 'react';
import pkmTypes from '../assets/types.json';

// all my states
const initialState = {
  active: false,
  allPokemonList: [],
  allPokemonLoading: true,
  filteredPokemons: [],
  loading: true,
  more: 0,
  offset: 0,
  pkmTypes,
  pokemonList: [],
};

const initialForm = {
  valueSearch: '',
};

export const PokemonProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const formPkm = useForm(initialForm);

  // get 20 pokemons and when reactivate this function add new 20 pokemons
  const getAllPkm = async (offset) => {
    const result = await fetchAllPkm(offset);
    setData((data) => {
      const newArray = [...data.pokemonList, ...result];

      return {
        ...data,
        pokemonList: newArray,
        loading: false,
      };
    });
  };

  // get all pokemon and return a list
  const getGlobalPkm = async () => {
    const result = await fetchAllPkm(0, 100000);
    setData((data) => ({
      ...data,
      allPokemonList: result,
      allPokemonLoading: false,
    }));
  };

  const getPokemonById = async (id) => {
    const data = await fetchPkmById(id);
    return data;
  };

  // change the offste to add 20 pokemons new
  const loadMorePokemons = () => {
    setData((data) => {
      return {
        ...data,
        loading: true,
        offset: data.offset + 20,
      };
    });
  };

  const ShowFilterType = () => {
    setData((data) => {
      return {
        ...data,
        active: !data.active,
      };
    });
  };

  // filter the pokemons by types and add this pokemon to an array
  const checkboxFilter = (e) => {
    setData((data) => {
      return {
        ...data,
        pkmTypes: {
          ...data.pkmTypes,
          [e.target.name]: e.target.checked,
        },
      };
    });

    if (e.target.checked) {
      const filteredResult = data.allPokemonList.filter((pokemon) =>
        pokemon.types.map(({ type }) => type.name).includes(e.target.name)
      );

      setData((data) => {
        return {
          ...data,
          filteredPokemons: [...data.filteredPokemons, ...filteredResult],
        };
      });
    } else {
      const filteredResult = data.filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map(({ type }) => type.name).includes(e.target.name)
      );

      setData((data) => {
        return {
          ...data,
          filteredPokemons: [...filteredResult],
        };
      });
    }
  };

  useEffect(() => {
    getAllPkm(data.offset);
  }, [data.offset]);

  useEffect(() => {
    getGlobalPkm();
  }, []);

  const value = {
    ...data,
    ...formPkm,
    getPokemonById,
    loadMorePokemons,
    checkboxFilter,
    ShowFilterType,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
