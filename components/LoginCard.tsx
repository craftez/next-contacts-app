import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { signIn } from "next-auth/client";
import { FcGoogle } from "react-icons/fc";
import { getApiUrl } from "../helpers/getApiUrl";

const url = getApiUrl();

export default function LoginCard() {
  return (
    <Box w="400px" rounded="20px" overflow="hidden">
      <Image src="/welcome_illustration.svg" alt="Contacts" />
      <Center flexDirection="column" py={6}>
        <Heading fontSize={"2xl"} fontFamily={"body"} mb={2}>
          Welcome to Contacts
        </Heading>
        <Button
          leftIcon={<FcGoogle />}
          onClick={() =>
            signIn("google", {
              callbackUrl: `${url}/contacts`,
            })
          }
        >
          Sign In with Google
        </Button>
      </Center>
    </Box>
  );
}
