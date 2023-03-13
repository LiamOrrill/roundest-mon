/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import { getOptionsForVote } from "~/utils/getRandomPokemon";

const Home: NextPage = () => {
  // const { data, isLoading } = api.example.hello.useQuery({ text: "Liam" });

  // if (isLoading) return <div>Loading...</div>;

  // if (data) return <div>{data.greeting}</div>;

  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = api.pokemon.getPokemonById.useQuery({ id: first || 0 });
  const secondPokemon = api.pokemon.getPokemonById.useQuery({
    id: second || 0,
  });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-2xl">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="flex max-w-2xl items-center justify-between rounded border p-8">
        <div className="flex h-64 w-64 flex-col">
          <img
            src={firstPokemon.data?.sprites.front_default || ""}
            className="w-full"
          />
          <div className="mt-[-2rem] text-center text-xl capitalize">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">vs</div>
        <div className="flex h-64 w-64 flex-col">
          <img
            src={secondPokemon.data?.sprites.front_default || ""}
            className="w-full"
          />
          <div className="mt-[-2rem] text-center  text-xl capitalize">
            {secondPokemon.data?.name}
          </div>
        </div>
        <div className="p-4" />
      </div>
    </div>
  );
};

export default Home;
