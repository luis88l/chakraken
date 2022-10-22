import { Box } from "@chakra-ui/react";
import { Key } from "react";
import DashboardMenuItem from "../DashboardMenuItem/DashboardMenuItem";

export default function DashboardMenu(props: { items: any }): any {
  const allMenuItems = props.items;

  const menuItems: any = [];

  allMenuItems.filter(function (item: { id_modulo: any }) {
    const i = menuItems.findIndex(
      (x: { id_modulo: any }) => x.id_modulo === item.id_modulo
    );
    if (i <= -1) {
      menuItems.push(item);
    }
    return null;
  });

  return (
    <Box
      flexDir={["row", "row", "column", "column", "column"]}
      justifyContent="center"
    >
      {menuItems.map(
        (menuItem: {
          nb_modulo: string;
          id_modulo: Key | null | undefined;
        }) => (
          <DashboardMenuItem
            title={menuItem.nb_modulo}
            key={menuItem.id_modulo}
            items={allMenuItems.filter(
              (item: { id_modulo: Key | null | undefined }) =>
                item.id_modulo === menuItem.id_modulo
            )}
          />
        )
      )}
    </Box>
  );
}
