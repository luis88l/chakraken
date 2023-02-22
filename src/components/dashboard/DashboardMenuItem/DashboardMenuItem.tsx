import { Flex, Box, Text, useDisclosure, Collapse } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Link from "next/link";

interface DashboardMenuItemProps {
  title: string;
  items: any;
  cerrarModal: any;
}

interface DashboardMenuItemOptionProps {
  id_opcion: string;
  de_ruta: string;
  nb_opcion: string;
}

export default function DashboardMenuItem(props: DashboardMenuItemProps): any {
  const { isOpen, onToggle } = useDisclosure();

  const subItems = props.items;

  return (
    <Box className="sidebar-item" color={isOpen ? "#ea4c89" : "#cbd5e0"}>
      <Flex
        width="100%"
        cursor="pointer"
        alignItems="center"
        justifyContent="space-between"
        onClick={onToggle}
      >
        <Box mr={3}>
          <Text
            className="active"
            fontSize="medium"
            color={{ base: "white", sm: "white", md: "white", lg: "white" }}
          >
            {props.title}
          </Text>
        </Box>
        <Box>
          {!isOpen && <FiChevronDown />}
          {isOpen && <FiChevronUp />}
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box color="white" mt="4" rounded="md" shadow="md">
          {subItems.map((item: DashboardMenuItemOptionProps) => (
            <Box
              key={item.id_opcion}
              cursor="pointer"
              _hover={{ color: "#ea4c89" }}
              onClick={props.cerrarModal}
            >
              <Link href={`/dashboard/${item.de_ruta}`}>
                <Text
                  pt={3}
                  pb={5}
                  fontSize="sm"
                  color={{
                    base: "white",
                    sm: "white",
                    md: "white",
                    lg: "white",
                  }}
                >
                  {item.nb_opcion}
                </Text>
              </Link>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
