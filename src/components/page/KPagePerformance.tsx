import { Box, Flex, Text } from "@chakra-ui/react";

export interface KPagePerformanceProps {
  title: string;
  children?: any;
  Filtros?: any;
  Menu?: any;
  VisibleFiltros: boolean;
}

export default function KPagePerformance(props: KPagePerformanceProps): any {
  return (
    <Box
      bgColor="#F5F5F5"
      w={["100%", "100%", "85%", "85%", "85%"]}
      paddingRight={10}
      paddingBottom={10}
      paddingLeft={10}
      paddingTop={0}
      margin={0}
      display="flex"
      flexDir={"column"}
    >
      <Box mt={4} mb={5} width="100%">
        <Box style={{ float: "left" }} width="70%">
          <Text fontSize="2xl">{props.title}</Text>
        </Box>
        <Box style={{ float: "right" }} alignContent="right" width="30%">
          {props.Menu}
        </Box>
      </Box>
      {props.VisibleFiltros && (
        <Box
          bgColor="#fff"
          p={10}
          maxW="99%"
          borderWidth="3px"
          borderRadius="sm"
          marginBottom={"1%"}
          marginTop={"1%"}
          letterSpacing={1}
        >
          {props.Filtros}
        </Box>
      )}

      <Box width="100%">
        <Flex
          bgColor="#fff"
          borderRadius={15}
          width="100%"
          minH="calc(87vh)"
          maxH="calc(87vh)"
          overflowY="scroll"
          flex="auto"
        >
          {props.children}
        </Flex>
      </Box>
    </Box>
  );
}
