import { Flex } from "@chakra-ui/react";
import DashboardHeading from "./DashboardHeading";
import DashboardMenu from "./DashboardMenu";
import DashboardProfile from "./DashboardProfile";

export default function Dashboard() {
    return (
        <Flex
            w={["100%", "100%", "10%", "15%", "15%"]}
            flexDir="column"
            alignItems="center"
            backgroundColor="#020202"
            color="#fff"
        >
            <Flex
                flexDir="column"
                h={[null, null, "100vh"]}
                justifyContent="space-between"
            >
                <Flex
                    flexDir="column"
                    as="nav"
                >
                    <DashboardHeading />
                    <DashboardMenu />
                </Flex>
                <DashboardProfile />
            </Flex>
        </Flex>
    );
}