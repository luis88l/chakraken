import { getSession } from "next-auth/react";
import KPage from "../../components/page/KPage";

export default function Index(): any {
  return <KPage title="Inicio">hi</KPage>;
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
