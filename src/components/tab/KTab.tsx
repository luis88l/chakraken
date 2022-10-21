import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export interface KTabProps {
	/**
	 * Titulo del Tab
	 */
	title: string;
	/**
	 * Titulo del Tab
	 */
	title2: string;
	/**
	 * Contenido del Tab
	 */
	content: string;
	/**
	 * Contenido del Tab
	 */
	content2: string;
}

function KTab(props: KTabProps) {
	return (
		<Tabs>
			<TabList>
				<Tab>{props.title}</Tab>
				<Tab>{props.title2}</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<p>{props.content}</p>
				</TabPanel>
				<TabPanel>
					<p>{props.content2}</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}
export default KTab;
