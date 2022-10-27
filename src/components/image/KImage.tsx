import { Image } from "@chakra-ui/react";
import { FC } from "react";

export interface KImageProps {
  /**
   * Este es el tamaño de la imagen
   */
  boxSize: string;
  objectFit: any;
  /**
   * Esta es nuestra imagen, aqui ira nuestro enlace o repositorio.
   */
  src: string;
  /**
   * Este es el nombre de nuestra imagen
   */
  alt: string;
}

const KImage: FC<KImageProps> = ({ boxSize, objectFit, src, alt }) => {
  return <Image boxSize={boxSize} objectFit={objectFit} src={src} alt={alt} />;
};

export default KImage;
