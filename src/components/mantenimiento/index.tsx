import { getSession } from "next-auth/react";
import Kimagen from "../image/KImage";
import { Box } from "@chakra-ui/react";
import KPage from "../page/KPage";

export default function Mantenimiento(): any {
  return (
    <KPage title={"Mantenimiento"}>
      <Box width={"100%"}>
        <div style={{ alignContent: "center" }}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "65px",
              textAlign: "center",
            }}
          >
            Nos estamos renovando
          </h1>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            <span>
              Gracias por tu paciencia, estamos mejorando nuestra App para
              ofrecerte la mejor experiencia en línea,
            </span>
          </p>
          <div
            style={{
              alignContent: "center",
              marginLeft: "35%",
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <Kimagen
              src="https://apikraken.coppel.com/mantenimiento_desktop.jpg"
              alt="Mantenimiento de la pagina"
              boxSize="60%"
              key={"jkjsahsjkhjka"}
              rounded={10}
            />
          </div>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              color: "#0b65af",
              textAlign: "left",
              alignContent: "flex-end",
            }}
          >
            ¡Volvemos pronto!
          </h4>
        </div>
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
