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
}

const KList: FC<KListprops> = ({ text, text2 }) => {
  return (
    <List spacing={3}>
      <ListItem>
        <ListIcon as={MdCheckCircle} color="green.500" />
        {text}
      </ListItem>
      {/* You can also use custom icons from react-icons */}
      <ListItem>
        <ListIcon as={MdSettings} color="green.500" />
        {text2}
      </ListItem>
    </List>
  );
};

export default KList;
