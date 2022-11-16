import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import KPage from "../../../components/page/KPage";
import {
  Grid,
  GridItem,
  List,
  ListItem,
  Center,
  Text,
  Avatar,
  Stack,
  Wrap,
  WrapItem,
  Icon,
  Button,
  IconButton,
  Flex,
  Box,
  Spacer,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiHeart } from "react-icons/fi";
import { AiFillTwitterCircle } from "react-icons/ai";
import ApiService from "../../../../data/services/ApiService";
// import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { DateTime } from "luxon";

export default function Tendencias(): any {
  const [company, setCompany] = useState("");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    void GetTwitter();
  }, [company]);

  const GetTwitter = async (): Promise<any> => {
    const form = new FormData();
    form.append("company", company);
    form.append("offset", offset.toString());

    await ApiService.getTwitter(form).then((item: any) => {
      if (item.data.status === 200) {
        setData(item.data.data);
      }
    });
  };

  const GetMas = () => {
    setOffset(offset + 10);
    GetRoles();
  };

  const GetRoles = () => {
    const form = new FormData();
    form.append("company", company);
    form.append("offset", offset.toString());

    ApiService.getTwitter(form).then((item: any) => {
      if (item.data.status === 200) {
        var i = data.concat(item.data.data);
        setData(i);
        return;
      }
    });
  };

  return (
    <KPage title="Tendencias">
      <Box>
        <Box w="100px" h="10" p="1">
          <Flex>
            <Center>
              <List spacing={4}>
                <ListItem fontWeight={900} fontFamily="Roboto" color="black">
                  <Icon
                    as={AiFillTwitterCircle}
                    marginLeft="5"
                    w={10}
                    h={10}
                  ></Icon>
                </ListItem>
                <ListItem fontWeight={900} fontFamily="Roboto" color="black">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("coppel")}
                  >
                    Coppel
                  </Button>
                </ListItem>
                <ListItem fontWeight={900} fontFamily="Roboto">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("amazon")}
                  >
                    Amazon
                  </Button>
                </ListItem>
                <ListItem fontWeight={900} fontFamily="Roboto">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("liverpool")}
                  >
                    Liverpool
                  </Button>
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem fontWeight={900} fontFamily="Roboto">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("walmart")}
                  >
                    Walmart{" "}
                  </Button>
                </ListItem>
                <ListItem fontWeight={900} fontFamily="Roboto">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("mercadolibre")}
                  >
                    Mercado libre{" "}
                  </Button>
                </ListItem>

                <ListItem fontWeight={900} fontFamily="Roboto">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    onClick={() => setCompany("elektra")}
                  >
                    Elektra{" "}
                  </Button>
                </ListItem>
              </List>
            </Center>
          </Flex>
        </Box>

        <Spacer />
        <Box w="100%">
          {data.map(
            (
              item: {
                de_profileName: string;
                createdAt: string;
                de_text: string;
                nu_favorite: string;
                nu_retweet: string;
                de_profileImageUrl: string;
                txt_analitycs: string;
              },
              i: number
            ) => (
              <Box w="80%" marginLeft="20%" marginBottom={50} key={i}>
                <Grid margin={0} templateColumns="repeat(2, 1fr)" gap={1}>
                  <GridItem padding="7px" w="100%">
                    <Wrap>
                      <WrapItem>
                        {" "}
                        <Avatar
                          name="Dan Abrahmov"
                          src={
                            item.de_profileImageUrl !== undefined
                              ? item.de_profileImageUrl
                              : "https://bit.ly/broken-link"
                          }
                        />
                      </WrapItem>
                      <List spacing="1px">
                        <ListItem fontWeight={700} fontFamily="Helvetica">
                          {item.de_profileName}
                        </ListItem>
                        <ListItem fontFamily="Helvetica" fontSize={12}>
                          {DateTime.fromISO(item.createdAt).toFormat(
                            "MMMM dd, yyyy: hh mm ss"
                          )}
                        </ListItem>
                      </List>
                    </Wrap>
                  </GridItem>
                  <GridItem padding="1px" w="100%">
                    <List spacing={1}>
                      <ListItem
                        fontWeight={600}
                        fontFamily="Roboto"
                        fontSize={15}
                      >
                        <Text fontSize={15}>Confident scores</Text>
                      </ListItem>
                      <ListItem
                        fontWeight={600}
                        fontFamily="Roboto"
                        fontSize={15}
                      >
                        {item.txt_analitycs != null ? (
                          <div>
                            <p>
                              {JSON.parse(item.txt_analitycs)[0].sentiment ===
                              "positive"
                                ? "Positivo"
                                : JSON.parse(item.txt_analitycs)[0]
                                    .sentiment === "negative"
                                ? "Negativo"
                                : JSON.parse(item.txt_analitycs)[0]
                                    .sentiment === "neutral"
                                ? "Neutral"
                                : ""}
                            </p>

                            <div>
                              <Tooltip
                                label={`${
                                  JSON.parse(item.txt_analitycs)[0]
                                    .confidenceScores.positive * 100
                                }% positivo`}
                                placement="top"
                              >
                                <div
                                  style={{
                                    width: `${
                                      JSON.parse(item.txt_analitycs)[0]
                                        .confidenceScores.positive * 100
                                    }%`,
                                    backgroundColor: "#66ff99",
                                    height: "15px",
                                    display: "inline-block",
                                    borderRadius: "5px 0 0 5px",
                                  }}
                                ></div>
                              </Tooltip>
                              <Tooltip
                                label={`${
                                  JSON.parse(item.txt_analitycs)[0]
                                    .confidenceScores.neutral * 100
                                }% neutral`}
                                placement="top"
                              >
                                <div
                                  style={{
                                    width: `${
                                      JSON.parse(item.txt_analitycs)[0]
                                        .confidenceScores.neutral * 100
                                    }%`,
                                    backgroundColor: "#b3b3b3",
                                    height: "15px",
                                    display: "inline-block",
                                  }}
                                ></div>
                              </Tooltip>
                              <Tooltip
                                label={`${
                                  JSON.parse(item.txt_analitycs)[0]
                                    .confidenceScores.negative * 100
                                }% negativo`}
                                placement="top"
                              >
                                <div
                                  style={{
                                    width: `${
                                      JSON.parse(item.txt_analitycs)[0]
                                        .confidenceScores.negative * 100
                                    }%`,
                                    backgroundColor: "#ff6666",
                                    height: "15px",
                                    display: "inline-block",
                                    borderRadius: "0 5px 5px 0",
                                  }}
                                ></div>
                              </Tooltip>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* <Progress
                    colorScheme="red"
                    size="sm"
                    value={20}
                    marginBottom={1}
                  />
                  <Progress
                    colorScheme="gray"
                    size="sm"
                    value={20}
                    marginBottom={1}
                  /> */}
                      </ListItem>
                    </List>
                  </GridItem>
                </Grid>
                <Grid
                  margin={0}
                  templateColumns="repeat(1, 1fr)"
                  gap={1}
                  // templateRows="repeat(, 1fr)"
                >
                  <GridItem padding="7px" w="100%" marginTop={5}>
                    <Wrap>
                      <WrapItem>
                        <Stack spacing={3}>
                          <Text fontSize="sm">{item.de_text}</Text>
                        </Stack>
                      </WrapItem>

                      <WrapItem>
                        <IconButton
                          variant="outline"
                          colorScheme="blue"
                          aria-label="Send email"
                          icon={<ArrowBackIcon />}
                          size="xs"
                        />
                        <Text marginLeft={1} marginRight={3}>
                          {item.nu_retweet}
                        </Text>
                        <IconButton
                          variant="outline"
                          colorScheme="red"
                          aria-label="Send email"
                          icon={<FiHeart />}
                          size="xs"
                        />
                        <Text marginLeft={1}> {item.nu_favorite}</Text>{" "}
                      </WrapItem>
                    </Wrap>
                  </GridItem>
                </Grid>
                <Divider border="solid 2px" marginTop={10} />
              </Box>
            )
          )}
          {data.length > 0 ? (
            <Center>
              {" "}
              <Button
                marginBottom={10}
                colorScheme="blue"
                size="lg"
                variant="outline"
                onClick={GetMas}
              >
                Ver mas
              </Button>
            </Center>
          ) : null}
        </Box>
      </Box>
    </KPage>
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
