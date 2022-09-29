import { Flex, Icon, Text, Link } from "@chakra-ui/react";
import { FiBox, FiBell, FiHome, FiPieChart } from "react-icons/fi";
import NextLink from 'next/link';

export default function DashboardMenu() {
    return (
        <Flex
            flexDir={["row", "row", "column", "column", "column"]}
            align={["center", "center", "center", "flex-start", "flex-start"]}
            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
            justifyContent="center"
        >
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <NextLink href="/dashboard">
                    <>
                        <Link display={["none", "none", "flex", "flex", "flex"]} >
                            <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                        </Link>
                        <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                            <Text className="active">Inicio</Text>
                        </Link>
                    </>
                </NextLink>
            </Flex>
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <NextLink href="/velocidad">
                    <>
                        <Link display={["none", "none", "flex", "flex", "flex"]} >
                            <Icon as={FiPieChart} fontSize="2xl" />
                        </Link>
                        <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                            <Text>Velocidad</Text>
                        </Link>
                    </>
                </NextLink>

            </Flex>
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <NextLink href="Push Notifications">
                    <>
                        <Link display={["none", "none", "flex", "flex", "flex"]}>
                            <Icon as={FiBell} fontSize="2xl" />
                        </Link>
                        <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                            <Text>Push Notifications</Text>
                        </Link>
                    </>
                </NextLink>
            </Flex>
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <NextLink href="/product-feed">
                    <>
                        <Link display={["none", "none", "flex", "flex", "flex"]}>
                            <Icon as={FiBox} fontSize="2xl" /></Link>
                        <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                            <Text>Product Feed</Text>
                        </Link>
                    </>
                </NextLink>

            </Flex>
        </Flex>
    );
}