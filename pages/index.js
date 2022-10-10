import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({films}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
{console.log(films.results)}
{
  films.results.map((film) =>(
    <div>
      {film.title}
    </div>
  ))
}
    </div>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://swapi.dev/api/films')
  const films = await res.json()

  return {
    props: {
      films,
    },
  }
}
