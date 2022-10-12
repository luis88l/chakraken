import { Flex } from "@chakra-ui/react";
import KAlert from "../alert/KAlert";
import DashboardHeading from "./DashboardHeading/DashboardHeading";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import DashboardProfile from "./DashboardProfile/DashboardProfile";

interface DashboardProps {
	userProfile: {
		nb_nombre: string;
		de_email: string;
		nb_usuario: string;
		cl_password?: string;
		de_rol?: string;
		id_rol?: string;
	};
	userOptions: {};
}

export default function Dashboard({
	userProfile,
	userOptions,
}: DashboardProps) {
	return (
		<Flex
			w={["100%", "100%", "18%", "18%", "18%"]}
			flexDir="column"
			alignItems="center"
			backgroundColor="#020202"
			color="#fff"
		>
			<Flex flexDir="column" h={[null, null, "100vh"]}>
				<Flex flexDir="column" as="nav">
					<DashboardHeading />
					<DashboardMenu items={userOptions} />
				</Flex>
				<DashboardProfile name={userProfile.nb_nombre} />
			</Flex>
		</Flex>
	);
}
