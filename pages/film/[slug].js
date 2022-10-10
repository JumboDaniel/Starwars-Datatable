import { useRouter } from "next/router";
import React from "react";

const Movies = ({ film }) => {
  return <div>Movies{JSON.stringify(film)} </div>;
};

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`https://swapi.dev/api/films/${params.slug}`);
  const film = await res.json();
  return {
    props: {
      film,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://swapi.dev/api/films");
  const films = await res.json();
  const param = films.results;

  const paths = param.map((path) => ({
    params: {
      slug: path.episode_id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Movies;
