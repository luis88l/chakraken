import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export interface KPagePerformanceProps {
  title: string;
  children?: any;
  Menu?: any;
  Color?: string;
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

      <Box width="100%">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.333 }}
          style={{ width: "100%" }}
        >
          <Box
            p={6}
            bgColor="#fff"
            borderRadius={15}
            width="100%"
            minH="calc(87vh)"
            maxH="calc(87vh)"
            display="flex"
          >
            {props.children}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
