import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { FC } from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";

export interface KListprops {
  /**
   * Texto del primer punto en la lista
   */
  text: string;
  /**
   * Texto del otro punto de la lista.
   */
  text2: string;
  /**
   * Este es el color del list.
   */
  color: string;
}

const KList: FC<KListprops> = ({ text, text2, color }) => {
  return (
    <List spacing={3}>
      <ListItem>
        <ListIcon as={MdCheckCircle} color={color} />
        {text}
      </ListItem>
      {/* You can also use custom icons from react-icons */}
      <ListItem>
        <ListIcon as={MdSettings} color={color} />
        {text2}
      </ListItem>
    </List>
  );
};

export default KList;
