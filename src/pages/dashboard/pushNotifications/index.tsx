/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import KPage from "../../../components/page/KPage";
import TabEnvio from "./TabEnvio";
import TabHistorial from "./TabHistorial";
import TabAjustes from "./TabAjustes";
import { Box, Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

export default function PushNotifications(): any {
  const [id_push, setPush] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const setObj = async (id_push: string) => {
    setPush(id_push);
    setTabIndex(0);
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const updateId = async (id: string) => {
    setPush(id);
  };
  return (
    <KPage title="Notificaciones Push">
      <Box>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>Envío</Tab>
            <Tab>Historial</Tab>
            <Tab>Ajustes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TabEnvio id_push={id_push} updateId={updateId} />
            </TabPanel>
            <TabPanel>
              <TabHistorial parentF={setObj} />
            </TabPanel>
            <TabPanel>
              <TabAjustes />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </KPage>
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
