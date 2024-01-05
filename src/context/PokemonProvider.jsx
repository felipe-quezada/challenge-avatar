import { fetchAllPkm, fetchPkmById } from '../services/pokemonServices';
import { PokemonContext } from './PokemonContext';
import { useForm } from '../hooks/useForms';
import { useEffect, useState } from 'react';
import pkmTypes from '../assets/types.json';

const initialState = {
  more: 0,
  offset: 0,
  pokemonList: [],
  allPokemonList: [],
  loading: true,
  allPokemonLoading: true,
  active: false,
  filteredPokemons: [],
  pkmTypes,
};
const initialForm = {
  valueSearch: '',
};

export const PokemonProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const formPkm = useForm(initialForm);

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

  return (
    <PokemonContext.Provider
      value={{
        ...data,
        ...formPkm,
        getPokemonById,
        loadMorePokemons,
        checkboxFilter,
        ShowFilterType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
