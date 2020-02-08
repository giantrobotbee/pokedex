import useSWR from "swr";
import * as R from "ramda";
import Link from "next/link";
import { useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/";

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

const renderPokemon = mon => {
  return (
    <li key={mon.name}>
      <span>{mon.name}</span>
    </li>
  );
};

function HomePage() {
  const [path, changePath] = useState(API_URL + "pokemon");
  const { data, error } = useSWR(path, fetcher);

  const pokemon = data && data.results;

  const nextPage = () => {
    changePath(data.next);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <ul>{R.map(renderPokemon, pokemon)}</ul>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default HomePage;
