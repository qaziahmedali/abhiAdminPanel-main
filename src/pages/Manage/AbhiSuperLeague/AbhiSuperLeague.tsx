import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Prizes from "./Prize/Prize";

export interface AbhiSuperLeagueProps {}

const AbhiSuperLeague: React.FC<AbhiSuperLeagueProps> = () => {
	return (
		<>
			<Tabs colorScheme="blue">
				<TabList>
					<Tab>Prizes</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Prizes />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export default AbhiSuperLeague;
