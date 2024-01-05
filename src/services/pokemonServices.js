import axios from 'axios';

const pkemonUrl = 'https://pokeapi.co/api/v2/';

export const fetchAllPkm = async (offset, limit = 20) => {
  // fetching a list of 20 pkm
  const { data } = await axios.get(
    `${pkemonUrl}pokemon/?offset=${offset}&limit=${limit}`
  );

  // add information to the list
  const promises = data.results.map(async ({ url }) => {
    const data = await fetchPkmInfoFromUrl(url);
    return data;
  });

  const pkmData = await Promise.all(promises);
  return pkmData;
};

// fetch the chain of evolution
export const fetchPkmChain = async (id) => {
  const { data } = await axios.get(`${pkemonUrl}pokemon-species/${id}`);
  let chain = await fetchPkmEvolChain(data.evolution_chain);
  let control = true;

  const arrayEvol = [];

  while (chain) {
    if (chain !== undefined) {
      // select id, img and name from the fetch and return the object
      const { sprites, id } = await fetchPkmById(chain.species.name);
      const imageUrl = sprites.other['official-artwork'].front_default;
      arrayEvol.push({ name: chain.species.name, imageUrl, id });
      chain = chain.evolves_to[0];
    } else {
      control = false;
    }
  }
  return arrayEvol;
};

// fetch a pokemon by id
export const fetchPkmById = async (id) => {
  const { data } = await axios.get(`${pkemonUrl}pokemon/${id}`);
  return data;
};

// --- function helper ---

// fetch the raw chain
const fetchPkmEvolChain = async ({ url }) => {
  const { data } = await axios.get(url);
  return data.chain;
};

// fetch a pokemon from an url
const fetchPkmInfoFromUrl = async (url) => {
  const { data } = await axios.get(url);
  return data;
};
