import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: `m1`,
    title: `A First Meetup`,
    image: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg`,
    address: `Some address 5, 12345 Some City`,
    description: `This is a first meetup!`
  },
  {
    id: `m2`,
    title: `A Second Meetup`,
    image: `https://media.timeout.com/images/105171709/image.jpg`,
    address: `Some address 10, 678910 Another City`,
    description: `This is a second meetup!`
  },
  {
    id: `m3`,
    title: `A Third Meetup`,
    image: `https://www.travelandleisure.com/thmb/_3nQ1ivxrnTKVphdp9ZYvukADKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/amsterdam-nl-AMSTERDAMTG0521-6d2bfaac29704667a950bcf219680640.jpg`,
    address: `Some address 20, 1112131415 Yet Another City`,
    description: `This is a third meetup!`
  }
];

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
        <meta name="author" content="Renan Martineli de Paula" />
        <link
          rel="icon"
          type="image/svg"
          href="reshot-icon-meeting-YFQTMLCHAZ.svg"
        />
      </Head>
      <MeetupList meetups={meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://renan:tSaVLsXJk8r5wBo8@cluster0.zcsrbek.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection(`meetups`);

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id }) => ({
        title,
        address,
        image,
        id: _id.toString()
      }))
    },
    revalidate: 1
  };
}
