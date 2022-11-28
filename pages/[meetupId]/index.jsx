import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails({
  meetupData: { image, title, address, description }
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Renan Martineli de Paula" />
        <link
          rel="icon"
          type="image/svg"
          href="reshot-icon-meeting-YFQTMLCHAZ.svg"
        />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://renan:tSaVLsXJk8r5wBo8@cluster0.zcsrbek.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection(`meetups`);

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: `blocking`,
    paths: meetups.map(({ _id }) => ({ params: { meetupId: _id.toString() } }))
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    `mongodb+srv://renan:tSaVLsXJk8r5wBo8@cluster0.zcsrbek.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection(`meetups`);

  const { _id, title, address, image, description } =
    await meetupsCollection.findOne({
      _id: ObjectId(meetupId)
    });

  client.close();

  return {
    props: {
      meetupData: {
        id: _id.toString(),
        title,
        address,
        image,
        description
      }
    }
  };
}
