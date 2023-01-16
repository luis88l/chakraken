import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import KPage from "../../../components/page/KPage";
import TabEnvio from "./TabEnvio";
import TabHistorial from "./TabHistorial";
import TabAjustes from "./TabAjustes";
import { Box, Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";

export default function PushNotifications(): any {
  const [tokenUsuarioPrueba, setTokenUsuarioPrueba] = useState("");
  const [numeroregistros, setNumeroRegistros] = useState(0);
  const [items, setItems] = useState([]);
  const d = "";
  useEffect(() => {
    void GetTokenUser();
    void Get();
  }, []);

  const GetTokenUser = async (): Promise<any> => {
    const form = new FormData();
    // form.append("company", company);
    // form.append("offset", offset.toString());

    await ApiService.getTokenUser(form).then((item: any) => {
      if (item.data.status === 200) {
        setTokenUsuarioPrueba(item.data.data[0].de_tokenPush);

        //setData(item.data.data);
      }
    });
  };

  const Get = async (): Promise<any> => {
    const form = new FormData();

    // form.append("numeropagina", this.state.pageEnvio as any);
    // form.append("filaspagina", this.state.rowsPerPageEnvio as any);
    ApiService.pushNotificationsGet(form).then((item: any) => {
      if (item.data.status === 200) {
        // console.log('DATA de push', item.data)
        // this.setState({
        //     items: item.data.data.rows,
        //     numeroregistros: item.data.data.count
        // })

        if (items.length < numeroregistros) {
          var itemsArray: any = items;

          var nuevoitems = items.concat(item.data.data.rows);

          setItems(nuevoitems);
          return;
        } else {
          if (itemsArray.length === 0) {
            setItems(item.data.data.rows);
            setNumeroRegistros(item.data.data.count);
          }
          return;
        }
      }
    });
  };
  //   useEffect(() => {
  //   void GetTwitter();
  // }, [company]);

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
            <TabPanel>
              <TabHistorial />{" "}
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
