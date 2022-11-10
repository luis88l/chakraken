import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { KAvatar } from "../../react";

export default function DashboardProfile(props: any): any {
  const { data: session } = useSession();

  if (session == null) {
    return null;
  }
  // @ts-expect-error
  const username = session.user.user.nb_usuario;

  return (
    <Flex flexDir="column" alignItems="center" pb={10} pt={10}>
      <Link href="/dashboard/userProfile">
        <KAvatar size={"sm"} name={"admin"} src={""} />
      </Link>
      <Text textAlign="center">{username}</Text>
      <Button
        mt={5}
        bg="#c21a6e"
        size="sm"
        _hover={{ bg: "#5e173a" }}
        onClick={async () => await signOut({ callbackUrl: "/login" })}
      >
        Cerrar sesión
      </Button>
    </Flex>
  );
}
