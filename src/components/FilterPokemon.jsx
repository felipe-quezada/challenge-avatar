import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const FilterPokemon = () => {
  const { pkmTypes, checkboxFilter, active } = useContext(PokemonContext);

  const types = Object.keys(pkmTypes);

  return (
    <div>
      <section
        className={`flex-wrap justify-center w-2/3 m-auto my-10 gap-10 border-2 border-gray-300 rounded-3xl p-6 ${
          active ? 'flex' : 'hidden'
        }`}
      >
        {types.map((type) => {
          return (
            <div key={type}>
              <input
                type="checkbox"
                name={type}
                id={type}
                onChange={checkboxFilter}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          );
        })}
      </section>
    </div>
  );
};
