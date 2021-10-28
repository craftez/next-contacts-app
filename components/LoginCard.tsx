import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { signIn } from "next-auth/client";
import { FcGoogle } from "react-icons/fc";

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
              callbackUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/contacts`,
            })
          }
        >
          Sign In with Google
        </Button>
      </Center>
    </Box>
  );
}
