import { HStack, Text, Badge } from "@chakra-ui/react";
import { BiMobileAlt, BiHomeAlt } from "react-icons/bi";
import { GoogleResourcePhone } from "../helpers/types";

export default function Phone({ type, value, metadata }: GoogleResourcePhone) {
  switch (type) {
    case "mobile":
      return (
        <HStack>
          <BiMobileAlt />
          <Text>{value}</Text>
          {metadata?.primary && (
            <Badge variant="outline" size="xs">
              Primary
            </Badge>
          )}
        </HStack>
      );

    case "home":
      return (
        <HStack>
          <BiHomeAlt />
          <Text>{value}</Text>
          {metadata?.primary && (
            <Badge variant="outline" size="xs">
              Primary
            </Badge>
          )}
        </HStack>
      );

    default:
      return (
        <HStack>
          <Text>{value}</Text>
          {metadata?.primary && (
            <Badge variant="outline" size="xs">
              Primary
            </Badge>
          )}
        </HStack>
      );
  }
}
