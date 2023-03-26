import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { FeedGatewayProduction } from "src/feed/FeedGateway.production";
import HomePage from "src/views/HomePage/HomePage";
import Layout from "src/components/Layout";
import Footer from "src/components/Footer";
const feedGateway = new FeedGatewayProduction();

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: feedGateway.retrieve,
  });

  if (error) return <p role="alert">Failed to get feed</p>;
  if (isLoading) return <p role="progressbar">Loading...</p>;
  if (!data) return null;

  return (
    <>
      <Head>
        <title>Frei RSS</title>
        <meta name="description" content="RSS reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomePage feeds={data} />
        <Footer />
      </Layout>
    </>
  );
}
