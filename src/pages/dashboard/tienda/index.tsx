import { getSession } from "next-auth/react";
import Mantenimineto from "../../../components/mantenimiento";

export default function Tienda(): any {
  return <Mantenimineto />;
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
