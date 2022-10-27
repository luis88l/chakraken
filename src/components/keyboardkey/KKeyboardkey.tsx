import { Kbd } from "@chakra-ui/react";
import { FC } from "react";

export interface KKeyboardkeyProps {
  /**
   * Este es el texto de nuestra primera funcion de comando
   */
  funcion: string;
  /**
   * Este es el texto de nuestra segunda funcion de comando
   */
  funcion2: string;
}

const KKeybordkey: FC<KKeyboardkeyProps> = ({ funcion, funcion2 }) => {
  return (
    <span>
      <Kbd>{funcion}</Kbd> + <Kbd>{funcion2}</Kbd>
    </span>
  );
};

export default KKeybordkey;
