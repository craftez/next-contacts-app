import { getSession, signOut, useSession } from "next-auth/client";

export default function Contacts() {
  const [session] = useSession();

  return (
    <>
      Signed in as {session?.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
