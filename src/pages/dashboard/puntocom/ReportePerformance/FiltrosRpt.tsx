import {
  Tabs,
  TabList,
  Tab,
  Box,
  Grid,
  GridItem,
  Input,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export default function Filtros(): any {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabDispositivos = (Opcion?: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabReporte = (Opcion?: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabRed = (Opcion: number) => {
    console.log(Opcion);
  };
  const SelectTabColor = { color: "white", bg: "blue.500" };
  return (
    <div>
      <Box
        p={10}
        maxW="inismtial"
        borderWidth="3px"
        borderRadius="sm"
        letterSpacing={1}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="90%" h="10">
            <Tabs size={"md"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  border={"1px"}
                  onClick={() => TabDispositivos(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"Todos"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabDispositivos(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"Mobile"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabDispositivos(3)}
                  _selected={SelectTabColor}
                  key={3}
                >
                  {"Desktop"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
          <GridItem w="90%" h="10" />
          <GridItem w="100%" h="10">
            <Tabs size={"md"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  border={"1px"}
                  onClick={() => TabReporte(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"Score"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabReporte(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"Performance Budget"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabReporte(3)}
                  key={3}
                  _selected={SelectTabColor}
                >
                  {"Metricas"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
        </Grid>

        <Grid
          style={{ marginTop: "2%", marginBottom: "3%" }}
          templateColumns="repeat(6, 1fr)"
          gap={6}
        >
          <GridItem w="90%" h="10" colSpan={2}>
            <FormControl isRequired>
              <FormLabel>Dominio</FormLabel>
              <Select placeholder="" variant="filled">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="90%" h="10">
            <FormControl>
              <FormLabel>Red</FormLabel>
              <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
                <TabList>
                  <Tab
                    border={"1px"}
                    onClick={() => TabRed(1)}
                    key={1}
                    _selected={SelectTabColor}
                  >
                    {"3G"}
                  </Tab>
                  <Tab
                    border={"1px"}
                    onClick={() => TabRed(2)}
                    key={2}
                    _selected={SelectTabColor}
                  >
                    {"4G"}
                  </Tab>
                </TabList>
              </Tabs>
            </FormControl>
          </GridItem>
          <GridItem w="90%" h="10">
            <FormControl>
              <FormLabel>Cahche</FormLabel>
              <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
                <TabList>
                  <Tab
                    border={"1px"}
                    onClick={() => TabRed(1)}
                    key={1}
                    _selected={SelectTabColor}
                  >
                    {"No"}
                  </Tab>
                  <Tab
                    border={"1px"}
                    onClick={() => TabRed(2)}
                    key={2}
                    _selected={SelectTabColor}
                  >
                    {"Si"}
                  </Tab>
                </TabList>
              </Tabs>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2} w="100%" h="10">
            <FormControl>
              <FormLabel>Buscar página</FormLabel>
              <Input
                // value={value}
                // onChange={handleChange}
                size="md"
              />
            </FormControl>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
}
