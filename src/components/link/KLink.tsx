import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FC } from "react";

export interface KLinkProps {
  /**
   * Este es el campo donde ira el Enlace
   */
  href: string;
  /**
   * Este es el campo donde ira el Texto.
   */
  text: string;
  /**
   * Este es el margen que ira desde la izquierda hacia la derecha
   */
  mx: string;
}

const KLink: FC<KLinkProps> = ({ href, text, mx }) => {
  return (
    <Link href={href} isExternal>
      {text} <ExternalLinkIcon mx={mx} />
    </Link>
  );
};

export default KLink;
