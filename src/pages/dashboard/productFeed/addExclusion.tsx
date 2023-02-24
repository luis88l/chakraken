// page component that shows in react-table all the exclusions that are in the database
//
import React, { useState } from "react";
import KPage from "../../../components/page/KPage";
import { getSession } from "next-auth/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { KAlert } from "../../../components/react";
import { useMutation } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { useRouter } from "next/router";

export interface productFeedExclusionsTable {
  sku: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  active: boolean;
}

export default function AddExclusion(): any {
  const [skusString, setSkusString] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const crearExclusion = useMutation(
    async (formData: any) => {
      return await ApiService.addExclusion(formData);
    },
    {
      onSuccess: () => {
        void router.push("/dashboard/productFeed/exclusiones");
      },
    }
  );

  // create a handleSubmit function that will send the skus to the backend
  const handleSubmit = (event: any): any => {
    event.preventDefault();
    setError(false);
    // if skussString is empty and is a string separated by commas
    // then split the string and create an array of skus
    // then send the array to the backend
    // else send an error message

    // if skusstring is a string separated by spaces then split the string
    // and create an array of skus

    if (skusString.includes(" ")) {
      const skusArray = skusString.split(" ");
      console.log(skusArray);
      setError(false);

      // iterate skusArray and send each sku to the backend

      skusArray.forEach((sku) => {
        crearExclusion.mutate({
          sku,
          active: true,
        });
      });
    }

    // if skusstring is a simple string without commas then create an array with one element
    if (skusString.length >= 1 && !skusString.includes(",")) {
      const skusArray = [skusString];
      console.log(skusArray);
      setError(false);

      skusArray.forEach((sku) => {
        crearExclusion.mutate({
          sku,
          active: true,
        });
      });
    }

    if (skusString === "") {
      console.log("error");
      setError(true);
    }

    // if skusstring is a string separated by commas then split the string
    // and create an array of skus

    // send the skus to the backend
  };

  return (
    <KPage title="Exclusiones">
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>SKU(s) a excluir</FormLabel>
            <Textarea
              placeholder="Escribe los SKU(s) que deseas excluir"
              onChange={(event) => {
                setSkusString(event.currentTarget.value);
              }}
            />
          </FormControl>
          <Flex mb={4} display="grid" justifyItems="flex-end" mt={5}>
            {error && (
              <KAlert
                icon
                status={"error"}
                title="Verifique que sean sku(s) compatible(s) y esten separados correctamente por comas."
              />
            )}
            <Button
              mt={5}
              w="200px"
              alignSelf="flex-end"
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              type="submit"
            >
              Agregar exclusiones
            </Button>
          </Flex>
        </form>
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
