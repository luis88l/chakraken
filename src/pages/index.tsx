import { getSession } from "next-auth/react";

const Index = (): any => {
  return null;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default Index;
