/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import { getOptionsForVote } from "~/utils/getRandomPokemon";

const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = api.pokemon.getPokemonById.useQuery({
    id: first as number,
  });
  const secondPokemon = api.pokemon.getPokemonById.useQuery({
    id: second as number,
  });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  const voteForRoundest = (selectedNumber: number) => {
    // TODO: Fire mutation to persist changes

    updateIds(() => getOptionsForVote());
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-2xl">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="flex max-w-2xl items-center justify-between rounded border p-8">
        <div className="flex h-64 w-64 flex-col items-center">
          <img
            src={firstPokemon.data?.sprites.front_default || ""}
            className="w-full"
          />
          <div className="mt-[-2rem] text-center text-xl capitalize">
            {firstPokemon.data?.name}
          </div>

          <button
            className={buttonClasses}
            onClick={() => voteForRoundest(first as number)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="flex h-64 w-64 flex-col items-center">
          <img
            src={secondPokemon.data?.sprites.front_default || ""}
            className="w-full"
          />
          <div className="mt-[-2rem] text-center  text-xl capitalize">
            {secondPokemon.data?.name}
          </div>

          <button
            className={buttonClasses}
            onClick={() => voteForRoundest(second as number)}
          >
            Rounder
          </button>
        </div>
        <div className="p-4" />
      </div>
    </div>
  );
};

export default Home;
