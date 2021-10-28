import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import LoginCard from "../components/LoginCard";
import { Center } from "@chakra-ui/layout";

const Home: NextPage = () => {
  const [_session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  return (
    <Center h="100vh" py={6}>
      <LoginCard />
    </Center>
  );
};

export default Home;
