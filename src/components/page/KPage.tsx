import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export interface KPageProps {
  title: string;
  children: React.ReactNode;
}

export default function KPage(props: KPageProps): any {
  return (
    <Box
      bgColor="#F5F5F5"
      paddingRight={10}
      paddingBottom={10}
      paddingLeft={10}
      paddingTop={0}
      margin={0}
      display="flex"
      flexDir={"column"}
      maxWidth="100%"
    >
      <Box mt={4} mb={5} width="100%">
        <Text fontSize={["2xl", "2xl", "xl", "xl", "2xl"]} fontWeight="bold">
          {props.title}
        </Text>
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
