import {
  Box,
  Button,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import { AiOutlineMenu, AiFillHome, AiOutlinePlus } from "react-icons/ai";

import NavLink from "./NavLink";

export default function Header() {
  const [session] = useSession();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box padding={4} bg="royalblue" color="white" shadow="md">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={4} alignItems="center">
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize={20}
              color={useColorModeValue("gray.800", "inherit ")}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={onOpen}
            />
          </Box>
          <Heading as="h1" size="md">
            CA
          </Heading>
          <NavLink
            href="/contacts"
            variant="outline"
            colorScheme="white"
            leftIcon={<AiFillHome />}
            size="sm"
          >
            Dashboard
          </NavLink>
        </HStack>
        <HStack display="flex" spacing={3} alignItems="center">
          <Button
            variant="outline"
            colorScheme="white"
            leftIcon={<AiOutlinePlus />}
            size="sm"
          >
            Add Contact
          </Button>
          <Menu>
            <MenuButton>
              <Avatar
                size="sm"
                name={session?.user?.name!}
                src={session?.user?.image!}
              />
            </MenuButton>
            <MenuList zIndex={2}>
              <MenuItem
                onClick={() => signOut()}
                color={useColorModeValue("gray.800", "inherit")}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
