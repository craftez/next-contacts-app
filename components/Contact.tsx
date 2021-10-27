import { Image } from "@chakra-ui/image";
import { HStack, Text } from "@chakra-ui/layout";
import { ContactType } from "../helpers/types";

interface ContactProps {
  contact: ContactType;
}

export default function Contact({ contact }: ContactProps) {
  return (
    <HStack spacing={2} display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={contact.profilePicture}
        alt={`Avatar of ${contact.fullName}`}
      />
      <Text fontWeight="medium">{contact.fullName}</Text>
    </HStack>
  );
}
