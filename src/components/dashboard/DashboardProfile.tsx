import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function DashboardProfile(): any {
  return (
    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
      <Avatar my={2} src="avatar-1.jpg" />
      <Text textAlign="center">Martín Barajas</Text>
    </Flex>
  );
}
