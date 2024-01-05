import { Link, useNavigate } from 'react-router-dom';
import { capitalizeText } from '../helpers/capitalizeText';

export const EvolutionChain = ({ type, url, name, pkmId }) => {
  return (
    <>
      <div className={`${type} w-36 p-2 rounded-full`}>
        <img className="object-contain w-full" src={url} alt={name} />
      </div>
      <span className="font-semibold">{capitalizeText(name)}</span>
    </>
  );
};
