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

const fetchPkmInfoFromUrl = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const fetchPkmChain = async (id) => {
  const { data } = await axios.get(`${pkemonUrl}pokemon-species/${id}`);
  let chain = await fetchPkmEvolChain(data.evolution_chain);
  let control = true;

  const arrayEvol = [];

  while (chain) {
    if (chain !== undefined) {
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

const fetchPkmEvolChain = async ({ url }) => {
  const { data } = await axios.get(url);
  return data.chain;
};

export const fetchPkmById = async (id) => {
  const { data } = await axios.get(`${pkemonUrl}pokemon/${id}`);
  return data;
};

export const fetchTypesPkm = async () => {
  const { data } = await axios.get(`${pkemonUrl}type`);
  return data;
};
