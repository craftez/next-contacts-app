import { Flex, Text, Image } from "@chakra-ui/react";

export default function NoData() {
  return (
    <Flex direction="column" alignItems="center">
      <Image src="/nodata.svg" alt="No Data" w={400} />
      <Text color="gray.300">Select a contact to view details.</Text>
    </Flex>
  );
}
