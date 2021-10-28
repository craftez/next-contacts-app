import { Comment } from ".prisma/client";
import { Box, Text, VStack } from "@chakra-ui/layout";
import relativeDate from "tiny-relative-date";

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <VStack w="full">
      {comments.map((comment) => (
        <Box
          shadow="md"
          p={4}
          bg="white"
          w="full"
          borderRadius={8}
          key={comment.id}
        >
          {comment.body}
          <Text fontSize={14} color="gray.500" fontStyle="italic">
            - {relativeDate(comment.createdAt)}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}
