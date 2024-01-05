import { capitalizeText } from '../helpers/capitalizeText';

export const EvolutionChain = ({ type, url, name }) => {
  return (
    <a href={`/pokemon/${name}`}>
      <div className={`${type} w-36 p-2 rounded-full`}>
        <img className="object-contain w-full" src={url} alt={name} />
      </div>
      <span className="font-semibold">{capitalizeText(name)}</span>
    </a>
  );
};
