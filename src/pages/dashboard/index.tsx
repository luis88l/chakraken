import React, { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import KPage from "../../components/page/KPage";

export default function Index(): any {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const router = useRouter();

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
