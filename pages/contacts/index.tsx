import { Flex, Box, Heading, Badge, HStack } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import ContactDetail from "../../components/ContactDetail";
import ContactsList from "../../components/ContactsList";
import Layout from "../../components/Layout";
import SearchBox from "../../components/SearchBox";
import { getApiUrl } from "../../helpers/getApiUrl";
import { ContactType } from "../../helpers/types";

export default function Contacts(props: any) {
  const [selectedContact, setSelectedContact] = useState<ContactType>();

  return (
    <Layout>
      <Flex h="calc(100% - 64px)" bg="#fafafa">
        <Box w={300} h="100%" overflowY="scroll">
          <Box position="fixed" zIndex={1} width="285px" bg="white" shadow="md">
            <HStack p={2}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Contacts
              </Heading>
              <Badge>{props.data.length}</Badge>
            </HStack>
            <SearchBox />
          </Box>
          <ContactsList
            data={props.data.contacts}
            onSelect={setSelectedContact}
            activeResourceId={selectedContact?.resourceId}
          />
        </Box>
        <Box flex={1}>
          <ContactDetail contact={selectedContact} />
        </Box>
      </Flex>
    </Layout>
  );
}

const url = getApiUrl();

export async function getServerSideProps(context: any) {
  try {
    console.log("contacts loading ...", url);

    const session = await getSession(context);

    const options = { headers: { cookie: context.req.headers.cookie } };
    const res = await fetch(`${url}/api/contacts`, options);
    const contactsData = await res.json();

    console.log("contacts loading ...", contactsData);
    if (!session || contactsData.error) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: contactsData,
      },
    };
  } catch (error) {
    console.log("¯_(ツ)_/¯", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
