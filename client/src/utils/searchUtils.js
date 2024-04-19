export const fetchPlayerData = async (value) => {
  let response = null;
  try {
    response = await fetch(`https://api.chess.com/pub/player/${value}`);
  } catch (e) {
    console.log(`Player ${value} not found!`);
    return false;
  }
  if (response !== null && response.status == 200) {
    const parseResponse = await response.json();
    return parseResponse;
  }
  return false;
};
