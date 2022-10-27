import React, { ReactNode } from "react";
import {
  Link,
  Box,
  chakra,
  Flex,
  Stack,
  Center,
  Heading,
  Image,
  Avatar,
  IconButton,
  Text,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import userImg from "@/assets/images/user.png";
import { HamburgerIcon } from "@chakra-ui/icons";

export interface HeaderProps {
  arrow: boolean;
  title: string;
}

export interface Props {
  onShowSidebar: any;
  showSidebarButton?: boolean;
  arrow: boolean;
  title: string;
}

const Links = ["Dashboard", "Projects", "Team"];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
const Header = ({
  showSidebarButton = true,
  onShowSidebar,
  arrow,
  title,
}: Props) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      bg="#7367F0"
      p={4}
      color="white"
      align="center"
      wrap="wrap"
      padding={6}
      justifyContent="center"
    >
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            aria-label=""
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>

      {!isOpen && (
        <Stack
          direction={{ base: "row", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={3}
          ml={{ md: 50 }}
        >
          {arrow && (
            <Box mt="5px">
              <FiArrowLeft
                onClick={history.goBack}
                size="24px"
                cursor="pointer"
                color="primaryColor"
              />
            </Box>
          )}
          <Text ml="5px" fontSize="xl">
            {title}
          </Text>
        </Stack>
      )}

      {isOpen && (
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>
      )}

      {false && <Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
        <Flex align="center">
          <Text mr="14px">UserName</Text>
          {/* src={userImg} */}
          <Avatar name="User Image" />
        </Flex>
      </Box>}
    </Flex>
  );
};
export default Header;
