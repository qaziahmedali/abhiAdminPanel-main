import React from "react";

import {
  Text,
  Box,
  chakra,
  Image,
  List,
  ListIcon,
  ListItem,
  Avatar,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from "@chakra-ui/react";
import { TokenService } from "../../utils/token";

import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaUserFriends, FaUsers, FaListAlt } from "react-icons/fa";
import { DiAptana } from "react-icons/di";
import { RiLoginBoxLine, RiDashboardFill } from "react-icons/ri";
import Link from "@/components/common/Link";
import { useHistory } from "react-router-dom";
import { useEasyActions } from "../../store/hooks";
import { resetStore } from "../../store";
import { apiManager } from "@/utils/apiManager/ApiManager";
import { catchTry } from "@/utils/betterTry";

const listItems = [
  {
    title: "Dashboard",
    icon: RiDashboardFill,
    link: "/dashboard",
  },
  {
    title: "Manage",
    icon: FaUserFriends,
    link: "/manage",
  },
  {
    title: "Monitor",
    icon: FaUsers,
    link: "/monitor",
  },
  {
    title: "Organization",
    icon: FaListAlt,
    link: "/organization",
  },
  {
    title: "Users",
    icon: BsFillQuestionSquareFill,
    link: "/users",
  },
  {
    title: "System",
    icon: DiAptana,
    link: "/system",
  },
  // {
  // 	title: "Test",
  // 	icon: DiAptana,
  // 	link: "/test",
  // },
  {
    title: "Logout",
    icon: RiLoginBoxLine,
    link: "/",
  },
];
export interface SideBarListItemProps {
  title: string;
  icon: any;
  link: string;
  active: boolean;
}

export interface Props {
  onClose: any;
  isOpen: boolean;
  variant: any | "drawer" | "sidebar";
  active: any;
}

const SideBarListItem: React.FC<SideBarListItemProps> = (props) => {
  const { setLoginStatus } = useEasyActions((state) => state.user);

  async function handleLogout() {
    const logoutUser = await catchTry(
      apiManager.fetch({
        name: "AuthLogout",
      })
    );

    if (logoutUser instanceof Error) {
      return false;
    }
    if (logoutUser.data.status === "success") {
      await resetStore();
      setLoginStatus(false);
      TokenService.clearStorage();
      history.push("/");
      //   console.log("LOGOUT", logoutUser.data);
      return logoutUser.data;
    }
  }

  let history = useHistory();
  return (
    <ListItem>
      <Link
        to={props.link}
        width="full"
        onClick={() => {
          if (props.link == "/") {
            handleLogout();
          }
        }}
        py="16px"
        display="flex"
        alignItems="center"
        color={props.active ? "#F6FFFC" : "darkText"}
        px="25px"
        position="relative"
      >
        <ListIcon
          as={props.icon}
          fontSize="24px"
          color={props.active ? "#F6FFFC" : "darkText"}
        />
        {props.title}
      </Link>
    </ListItem>
  );
};
const SidebarContent = ({ onClick }: { onClick: any }) => {
  let history = useHistory();
  const path = history.location.pathname;
  return (
    <VStack>
      <Box px="22px" mb="60px">
        <Link to="/dashboard">
          <Text fontSize="24px" color="#ffffff">
            {" "}
            Admin Console
          </Text>
          {/* src={Logo} */}
          {/* <Avatar size="xl" name="Abhi Finance logo" /> */}
        </Link>
      </Box>
      <chakra.nav>
        <List>
          {listItems.map((item) => (
            <SideBarListItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              link={item.link}
              active={item.link === path}
            />
          ))}
        </List>
      </chakra.nav>
    </VStack>
  );
};

export interface SideBarProps {
  active: string;
}

const SideBar = ({ isOpen, variant, onClose }: Props) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="250px"
      top={0}
      h="100%"
      bg="#10163A"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="#3F4254">
          <DrawerCloseButton color="#ffffff" />
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
export default SideBar;
