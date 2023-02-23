import { Box, Divider, Flex } from "@chakra-ui/react";
import DashboardHeading from "./DashboardHeading/DashboardHeading";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import DashboardProfile from "./DashboardProfile/DashboardProfile";

interface DashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  userOptions: void | undefined[] | any[];
  cerrarModal: any;
}

export default function Dashboard(props: DashboardProps): any {
  return (
    <>
      <Flex
        w={{ base: "100%", lg: "25%", md: "20%", sm: "25%" }}
        flexDir="column"
        alignItems="center"
        backgroundColor={{
          base: "#020202",
          lg: "#020202",
          sm: "#020202",
          md: "#020202",
        }}
        color={{ base: "#fff", lg: "#fff", sm: "#fff", md: "#fff" }}
        p="5"
      >
        <Flex flexDir="column" h={[null, null, "100vh"]}>
          <Box>
            <DashboardHeading />
          </Box>
          <Flex
            flexDir="column"
            as="nav"
            overflowY="scroll"
            flex="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box>
              <DashboardMenu
                items={props.userOptions}
                cerrarModal={props.cerrarModal}
              />
            </Box>
          </Flex>
          <Divider orientation="horizontal" color="#cccccc" mt={10} />
          <DashboardProfile />
        </Flex>
      </Flex>
    </>
  );
}
