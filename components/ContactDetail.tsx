import {
  Center,
  Flex,
  HStack,
  Avatar,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Heading,
  StackDivider,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AiFillEdit,
  AiFillMail,
  AiFillPhone,
  AiFillStar,
} from "react-icons/ai";
import { Comment } from ".prisma/client";
import { ContactType } from "../helpers/types";
import CommentsList from "./CommentsList";
import NewCommentsForm from "./NewCommentsForm";
import NoData from "./NoData";
import Phone from "./Phone";

interface ContactDetailProps {
  contact?: ContactType;
}

export default function ContactDetail({ contact }: ContactDetailProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  async function loadContactComments() {
    const resourceId = contact?.resourceId!.replace(/people\//g, "");
    const result = await fetch(`/api/contacts/${resourceId}/comments`);
    const comments = await result.json();
    setComments(comments);
  }

  useEffect(() => {
    if (contact) {
      loadContactComments();
    }
    return () => {
      setComments([]);
    };
  }, [contact]);

  if (!contact)
    return (
      <Center h="calc(100vh - 68px)" py={6}>
        <NoData />
      </Center>
    );

  const handleCommentCreated = (newComment: Comment) => {
    // handle optimistic updates
    setComments((currentComments) => [...currentComments, newComment]);
  };

  return (
    <Flex p={{ base: 4, md: 6 }}>
      <VStack spacing={4} flex={1} divider={<StackDivider />}>
        <VStack spacing={4} alignItems="center">
          <Avatar size="xl" src={contact.profilePicture} />
          <Heading size="2xl">{contact.fullName}</Heading>
          <HStack spacing={3}>
            <IconButton
              variant="outline"
              colorScheme="messenger"
              isRound
              aria-label="Edit"
              fontSize={20}
              icon={<AiFillEdit />}
            />
            <IconButton
              variant="outline"
              colorScheme="messenger"
              isRound
              aria-label="Favorite"
              fontSize={20}
              icon={<AiFillStar />}
            />
            <IconButton
              variant="outline"
              colorScheme="messenger"
              isRound
              aria-label="Favorite"
              fontSize={20}
              icon={<AiFillPhone />}
            />
            <IconButton
              variant="outline"
              colorScheme="messenger"
              isRound
              aria-label="Favorite"
              fontSize={20}
              icon={<AiFillMail />}
            />
          </HStack>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={1}>
            <Text fontSize="sm" color="gray.500">
              First Name:
            </Text>
            <Text>
              {contact.firstName}
              {contact.middleName ? ` ${contact.middleName}` : null}
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontSize="sm" color="gray.500">
              Last Name:
            </Text>
            <Text>{contact.lastName}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontSize="sm" color="gray.500">
              Phones
            </Text>
            {contact.phones?.map((phone) => {
              return <Phone key={phone.value} {...phone} />;
            })}
          </GridItem>
        </SimpleGrid>
        <VStack w="full" display="flex" alignItems="flex-start">
          <Text fontSize="sm" color="gray.500">
            Comments
          </Text>
          <CommentsList comments={comments} />
          <NewCommentsForm onSuccess={handleCommentCreated} contact={contact} />
        </VStack>
      </VStack>
    </Flex>
  );
}
