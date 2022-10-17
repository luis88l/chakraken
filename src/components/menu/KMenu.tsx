import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
  } from '@chakra-ui/react';

  function KMenu(props){
    return(
  <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme={props.colorScheme}>
    {props.titleMenu}
  </MenuButton>
  
  <MenuList>
    <MenuItem as="a" href={props.href} color={props.colorItem}> {props.item1} </MenuItem>
    <MenuItem as="a" href={props.href}> {props.item2} </MenuItem>
    <MenuItem as="a" href={props.href}> {props.item3} </MenuItem>
    <MenuItem as="a" href={props.href}> {props.item4} </MenuItem>
    <MenuItem as="a" href={props.href} color={props.colorItemDelete}> {props.item5} </MenuItem>
  </MenuList>

</Menu>
    );
  }

  export default KMenu;