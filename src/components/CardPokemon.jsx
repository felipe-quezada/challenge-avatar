import { Link } from 'react-router-dom';
import defaultPkm from '../assets/defaultPkm.png';

export const CardPokemon = ({ pkm }) => {
  return (
    <Link to={`/pokemon/${pkm.id}`}>
      <div className="p-4 max-w-sm border-gray-500 border-2 rounded-3xl bg-slate-100 shadow-md hover:bg-orange-300">
        <div className="flex h-full  p-8 flex-col">
          <div className="flex items-center">
            <div className="w-full mr-3 inline-flex items-center justify-center rounded-3xl flex-shrink-0 bg-slate-100 shadow-md border-gray-500 border-2">
              <img
                src={
                  pkm.sprites.other['official-artwork'].front_default ||
                  defaultPkm
                }
                alt={pkm.name}
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-center mt-8 space-y-3">
            <div className="space-x-2">
              {pkm.types.map(({ type }) => {
                return (
                  <span
                    key={type.name}
                    className={`rounded-xl px-2 py-1 text-white font-semibold ${type.name}`}
                  >
                    {type.name}
                  </span>
                );
              })}
            </div>
            <div className="font-bold text-xl uppercase">
              <span>{pkm.name}</span>
            </div>
            <span>N°: {pkm.id}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
