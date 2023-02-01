import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import KPage from "../../../components/page/KPage";
import TabEnvio from "./TabEnvio";
import TabHistorial from "./TabHistorial";
import TabAjustes from "./TabAjustes";
import { Box, Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

export default function PushNotifications(): any {
  return (
    <KPage title="Notificaciones Push">
      <Box>
        <Tabs>
          <TabList>
            <Tab>Envío</Tab>
            <Tab>Historial</Tab>
            <Tab>Ajustes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TabEnvio />
            </TabPanel>
            <TabPanel></TabPanel>
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
