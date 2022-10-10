import DataTable from "react-data-table-component";
import React from "react";

const Movies = ({ film, jsons }) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,

    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,

    },
    {
      name: "HeightCm",
      selector: (row) => row.heightCm,
      sortable: true,

    },
    {
      name: "HeightFt",
      selector: (row) => row.heightFt,
      sortable: true,

    },
  ];

  const data = jsons.map((elem,index )=> (
    {
      id: index + 1,
      name: elem.name,
      gender: elem.gender,
      heightCm:`${elem.height}cm`,
      heightFt: `${Math.round(elem.height / 30.48)}ft`,
    } 
  ))
  
  
  return (
    <div>
      <section>
        <DataTable columns={columns} data={data} /> 
      </section>
    </div>
  );
};

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`https://swapi.dev/api/films/${params.slug}`);
  const film = await res.json();
  const characters = await Promise.all(film.characters.map((u) => fetch(u)));
  const jsons = await Promise.all(characters.map((r) => r.json()));
  return {
    props: {
      film,
      jsons,
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
