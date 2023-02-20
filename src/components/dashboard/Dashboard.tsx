import { Box, Divider, Flex } from "@chakra-ui/react";
import DashboardHeading from "./DashboardHeading/DashboardHeading";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import DashboardProfile from "./DashboardProfile/DashboardProfile";

interface DashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  userOptions: void | undefined[] | any[];
}

export default function Dashboard(props: DashboardProps): any {
  return (
    <Flex
      w={["15%"]}
      flexDir="column"
      alignItems="center"
      backgroundColor="#020202"
      color="#fff"
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
            <DashboardMenu items={props.userOptions} />
          </Box>
        </Flex>
        <Divider orientation="horizontal" color="#cccccc" mt={10} />
        <DashboardProfile />
      </Flex>
    </Flex>
  );
}
