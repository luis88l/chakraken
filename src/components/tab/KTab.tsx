import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FC } from "react";

export interface KTabProps {
  /**
   * Este es el titulo de la primer seccion
   */
  title: string;
  /**
   * Este es el titulo de la segunda seccion
   */
  title2: string;
  /**
   * Este es el contenido de la primera seccion
   */
  content: string;
  /**
   * Este es el contenido de la segunda seccion
   */
  content2: string;
}

const KTab: FC<KTabProps> = ({ title, title2, content, content2 }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>{title}</Tab>
        <Tab>{title2}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>{content}</p>
        </TabPanel>
        <TabPanel>
          <p>{content2}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default KTab;
