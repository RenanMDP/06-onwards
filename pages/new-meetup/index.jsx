import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const { push } = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch(`/api/new-meetup`, {
      method: `POST`,
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': `application/json`
      }
    });

    const data = await response.json();

    console.log(data);

    push(`/`);
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
        <meta name="author" content="Renan Martineli de Paula" />
        <link
          rel="icon"
          type="image/svg"
          href="reshot-icon-meeting-YFQTMLCHAZ.svg"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}
