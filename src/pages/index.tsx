import Head from "next/head";
import HomePage from "src/components/HomePage";
import Layout from "src/components/Layout";
import Footer from "src/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frei RSS</title>
        <meta name="description" content="RSS reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomePage />
        <Footer />
      </Layout>
    </>
  );
}
