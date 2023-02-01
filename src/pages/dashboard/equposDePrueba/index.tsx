import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/react";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function Roles(): any {
  const { isLoading, isSuccess } = useQuery(
    "roles",
    async () => await ApiService.getRoles()
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  if (isSuccess) {
    return (
      <KPage title="Equipos de prueba">
        <Box>Equipos de prueba - En proceso</Box>
      </KPage>
    );
  }
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
