import { Comment } from ".prisma/client";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { getResourceId } from "../helpers/getResourceId";
import { ContactType } from "../helpers/types";

interface NewCommentsFormProps {
  contact: ContactType;
  onSuccess(comment: Comment): void;
}

export default function NewCommentsForm({
  contact,
  onSuccess,
}: NewCommentsFormProps) {
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const resourceId = getResourceId(contact);
      const response = await fetch(`/api/contacts/${resourceId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          body: comment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newComment = await response.json();

      if ((newComment as { error: string }).error) {
        throw new Error(newComment.error);
      }

      setComment("");
      onSuccess(newComment);
    } catch (error) {
      console.log("¯_(ツ)_/¯", error);
      setErrorMessage("We couldn't create your comment. Please try again.");
    }
  };

  return (
    <VStack w="full">
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <HStack alignItems="stretch" w="100%">
        <Textarea w="100%" value={comment} onChange={handleTextChange} />
        <Button
          h="100%"
          px={8}
          onClick={handleCommentSubmit}
          disabled={comment.length === 0}
        >
          Comment
        </Button>
      </HStack>
    </VStack>
  );
}
