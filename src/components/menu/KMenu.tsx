import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export interface KMenuProps {
  /**
   * Arreglo que va tener las opciones
   */
  items: [];
  /**
   * Este es el titulo del menu
   */
  titleMenu: string;
}

export interface KMenuItemProps {
  link: string;
  title: string;
}

function KMenu(props: KMenuProps) {
  const items = props.items;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {props.titleMenu}
      </MenuButton>

      <MenuList>
        {items.map((item: KMenuItemProps, index) => (
          <MenuItem as="a" href={item.link} key={index}>
            {item.title}{" "}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default KMenu;
