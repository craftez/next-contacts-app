import { Button } from "@chakra-ui/button";
import {
  Box,
  Divider,
  HStack,
  List,
  ListItem,
  Stack,
  StackDivider,
} from "@chakra-ui/layout";
import { getContactData } from "../helpers/getContactData";
import type { ContactType, GoogleResourceType } from "../helpers/types";
import Contact from "./Contact";

interface ContactsListProps {
  data: GoogleResourceType[];
  onSelect(contact: ContactType): void;
  activeResourceId?: string;
}

export default function ContactsList({
  data,
  onSelect,
  activeResourceId,
}: ContactsListProps) {
  return (
    <Box pt={28} pb={5} px={4}>
      <Stack spacing={2} divider={<StackDivider m="0 !important" />}>
        {data.map((item: any) => {
          const contact = getContactData(item);
          return (
            <Box
              key={contact.resourceId}
              cursor="pointer"
              padding={2}
              bg={
                activeResourceId === contact.resourceId
                  ? "gray.100"
                  : "transparent"
              }
              onClick={() => {
                onSelect(contact);
              }}
            >
              <Contact contact={contact} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
