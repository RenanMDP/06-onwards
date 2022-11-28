import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === `POST`) {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://renan:tSaVLsXJk8r5wBo8@cluster0.zcsrbek.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection(`meetups`);

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: `Meetup inserted!` });
  }
}
