import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FC } from "react";

export interface MulTabProps {
  /**
   * Array de titulos para el tab
   */
  Titulos: string[];
  /**
   * Este es el contenido de las opciones
   */
  Contenido: any[];
}

const MulTab: FC<MulTabProps> = ({ Titulos, Contenido }) => {
  return (
    <Tabs size={"sm"}>
      <TabList>
        {Titulos.map((tab, index) => (
          <Tab key={index}>{tab}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Contenido.map((Cont, index) => (
          <TabPanel key={index}>{Cont}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
export default MulTab;
