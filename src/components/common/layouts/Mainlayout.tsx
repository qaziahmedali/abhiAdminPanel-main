import React, { useState } from "react";
import SideBar from "../../common/SideBar";
import Header from "../../common/Header";
import { useHistory } from "react-router-dom";
import { Box, useBreakpointValue, Center } from "@chakra-ui/react";
export interface MainLayoutProps {
  title: string;
}
const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const history = useHistory();
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
	const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

	return (
		<>
			<SideBar
				variant={variants?.navigation}
				isOpen={isSidebarOpen}
				onClose={toggleSidebar}
				active={history.location.pathname}
			/>
			{variants && variants.navigation === "drawer" && (
				<Header
					showSidebarButton={variants?.navigationButton}
					onShowSidebar={toggleSidebar}
					arrow={true}
					title={props.title}
				/>
			)}
			<Center backgroundColor="whiteAlpha.900">
				<Box
					p={4}
					width={{ base: "100%", sm: "100%", md: "78%" }}
					ml={{ md: 250 }}
				>
					{props.children}
				</Box>
			</Center>
		</>
	);
};

export default MainLayout;
