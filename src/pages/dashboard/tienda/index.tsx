import { getSession } from "next-auth/react";
import Mantenimineto from "../../../components/mantenimiento";
import KPage from "../../../components/page/KPage";

export default function Tienda(): any {
  return (
    <KPage title={"Tienda"}>
      <Mantenimineto />
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