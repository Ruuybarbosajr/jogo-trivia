import md5 from 'crypto-js/md5';

const fetchImage = async (email) => {
  const HASH = md5(email).toString();
  const ENDPOINT = `https://www.gravatar.com/avatar/${HASH}`;
  const coins = await fetch(ENDPOINT);
  const hash = await coins.json();
  return hash;
};

export default fetchImage;
