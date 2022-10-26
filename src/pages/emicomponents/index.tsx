import { Grid, GridItem } from "@chakra-ui/react";

export default function emicomponents() {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"50px 1fr 520px"}
      gridTemplateColumns={"160px 1fr"}
      h="100px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="0" bg="purple.300" area={"footer"}></GridItem>

      <GridItem pl="2" bg="purple.200" area={"nav"}></GridItem>

      <GridItem pl="2" bg="purple.200" area={"main"}></GridItem>
      <GridItem pl="2" bg="purple.300" area={"header"}></GridItem>
    </Grid>
  );
}
