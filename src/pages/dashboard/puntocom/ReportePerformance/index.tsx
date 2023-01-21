import { getSession } from "next-auth/react";
import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";

export default function ReportePerformance(): any {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabDispositivos = (Opcion?: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabReporte = (Opcion?: number) => {
    console.log(Opcion);
  };

  return (
    <div>
      <Box
        p={10}
        maxW="inismtial"
        borderWidth="3px"
        borderRadius="sm"
        letterSpacing={1}
      >
        <div>
          <div style={{ float: "left" }}>
            <Tabs size={"sm"}>
              <TabList>
                <Tab onClick={() => TabDispositivos(1)} key={1}>
                  {"Todos"}
                </Tab>
                <Tab onClick={() => TabDispositivos(2)} key={2}>
                  {"Mobile"}
                </Tab>
                <Tab onClick={() => TabDispositivos(3)} key={3}>
                  {"Desktop"}
                </Tab>
              </TabList>
            </Tabs>
          </div>
          <div />
          <div style={{ float: "right" }}>
            <Tabs size={"sm"}>
              <TabList>
                <Tab onClick={() => TabReporte(1)} key={1}>
                  {"Score"}
                </Tab>
                <Tab onClick={() => TabReporte(2)} key={2}>
                  {"Performance Budget"}
                </Tab>
                <Tab onClick={() => TabReporte(3)} key={3}>
                  {"Metricas"}
                </Tab>
              </TabList>
            </Tabs>
          </div>
        </div>
      </Box>
      <Box
        p="30%"
        maxW="inismtial"
        maxH="80%"
        borderWidth="3px"
        borderRadius="lg"
        marginTop={"20px"}
        overflow="scroll"
        letterSpacing={1}
      ></Box>
    </div>
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
