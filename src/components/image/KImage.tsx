import { Image } from "@chakra-ui/react";
import { FC } from "react";

export interface KImageProps {
  /**
   * Este es el tamaño de la imagen
   */
  boxSize: string;
  objectFit?: any;
  /**
   * Esta es nuestra imagen, aqui ira nuestro enlace o repositorio.
   */
  src: string;
  /**
   * Este es el nombre de nuestra imagen
   */
  alt: string;
  /**
   * Este es un efecto de redondeo que podemos aplicar en la imagen (0 - 100)
   */
  rounded: number;
}

const KImage: FC<KImageProps> = ({ boxSize, objectFit, src, alt, rounded }) => {
  return (
    <Image
      boxSize={boxSize}
      objectFit={objectFit}
      src={src}
      alt={alt}
      rounded={rounded}
    />
  );
};

export default KImage;
