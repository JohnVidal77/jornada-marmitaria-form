import Head from "next/head"
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Jornada da Marmiteira</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default MyApp
