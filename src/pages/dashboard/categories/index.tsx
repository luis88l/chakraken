import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";

export default function Categorias(): any {
  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useQuery(
    ["productFeedAlerts"],
    async () => await ApiService.getSiteCategories()
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  if (isSuccess) {
    console.log(categories);

    return (
      <Box>
        <p>hi</p>
      </Box>
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
