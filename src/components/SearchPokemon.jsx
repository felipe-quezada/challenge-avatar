import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PokemonContext } from '../context/PokemonContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterPokemon } from './FilterPokemon';

export const SearchPokemon = () => {
  const context = useContext(PokemonContext);

  const navigate = useNavigate();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (context.valueSearch.length === 0) {
      navigate('/');
    } else {
      navigate('/search', {
        state: context.valueSearch,
      });
      context.onResetForm();
    }
  };

  return (
    <>
      <form
        className="space-x-3 mb-4 flex flex-col space-y-4 items-center justify-center md:flex-row"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          className="border-2 rounded-full px-3 py-2 w-2/3"
          name="valueSearch"
          onChange={context.onInputChange}
          value={context.valueSearch}
        />
        <div>
          <button
            type="button"
            className="bg-gray-100 rounded-full px-5 py-2 space-x-3 hover:bg-gray-300"
            onClick={context.ShowFilterType}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>filtrar</span>
          </button>
          <button
            type="submit"
            className="bg-gray-100 rounded-full px-5 py-2 space-x-3 hover:bg-gray-300"
          >
            <span>Buscar</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <div>
        <FilterPokemon />
      </div>
    </>
  );
};
