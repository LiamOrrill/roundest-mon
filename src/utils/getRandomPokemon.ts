const MAX_DEX_ID = 493;

export const getRandomPokemon = (notThisOne?: number): number => {
  const pokeDexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokeDexNumber !== notThisOne) {
    return pokeDexNumber;
  }

  return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = (): number[] => {
  const first = getRandomPokemon();
  const second = getRandomPokemon(first);

  return [first, second];
};
