import Head from "next/head";
import { FeedReaderGatewayProduction } from "src/feed/FeedGateway.production";
import HomePage from "src/views/HomePage/HomePage";
import Layout from "src/components/Layout";
import Footer from "src/components/Footer";
const feedGateway = new FeedReaderGatewayProduction();

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
