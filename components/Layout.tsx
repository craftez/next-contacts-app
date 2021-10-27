import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import { WithChildren } from "./types";

type LayoutProps = WithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      {children}
    </Flex>
  );
}
