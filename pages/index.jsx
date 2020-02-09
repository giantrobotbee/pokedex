import { Fragment } from "react";
import useSWR from "swr";
import * as R from "ramda";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./app.module.css";

const API_URL = "https://pokeapi.co/api/v2";
const PAGE_LIMIT = 10;

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

const Mon = ({ mon }) => {
  return (
    <li>
      <span>{mon.name}</span>
    </li>
  );
};

const Dex = ({ pokemon }) => {
  return (
    <Fragment>
      <ul>
        {R.map(
          mon => (
            <Mon mon={mon} key={mon.name} />
          ),
          pokemon
        )}
      </ul>
    </Fragment>
  );
};

function HomePage() {
  const router = useRouter();
  const { pageNum } = router.query;
  const path = `${API_URL}/pokemon?limit=${PAGE_LIMIT}&offset=${pageNum *
    PAGE_LIMIT -
    10}`;
  const { data, error } = useSWR(path, fetcher);

  const howManyPokemon = data ? data.count : 0;
  const pageCount = Math.ceil(howManyPokemon / PAGE_LIMIT);

  const mainSection = () => {
    if (error) return <div>Fuck...</div>;
    if (!data) return <div>Big Loamd...</div>;
    if (data.results.length === 0) return <div>I got nothin' for ya...</div>;

    return (
      <Fragment key={pageNum}>
        <Dex pokemon={data.results} />
        <div className={styles.pageNav}>
          <Link href={`?pageNum=${Number(pageNum) - 1}`}>
            <button disabled={!Boolean(data.previous) ?? "disabled"}>
              Previous
            </button>
          </Link>
          <span>{`Page ${Number(pageNum)} of ${pageCount}`}</span>
          <Link href={`?pageNum=${Number(pageNum) + 1}`}>
            <button disabled={Number(pageNum) === pageCount && "disabled"}>
              Next
            </button>
          </Link>
        </div>
      </Fragment>
    );
  };

  return <div className={styles.pokedex}>{mainSection()}</div>;
}

export default HomePage;
