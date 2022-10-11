import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function KTab() {
	return (
		<Tabs>
			<TabList>
				<Tab>One</Tab>
				<Tab>Two</Tab>
				<Tab>Three</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<p>Uno</p>
				</TabPanel>
				<TabPanel>
					<p>Dos</p>
				</TabPanel>
				<TabPanel>
					<p>Tres</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
export default KTab;
