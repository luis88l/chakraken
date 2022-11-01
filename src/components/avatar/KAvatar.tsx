import { Avatar, ResponsiveValue, Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";

export interface KAvatarProps {
  /**
   * Tamaño de la imagen
   * (full, 2xl, xl, lg, md, sm, xs, 2xs)
   */
  size:
    | ResponsiveValue<
        | (string & {})
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "full"
        | "2xs"
        | "xs"
      >
    | undefined;
  /**
   * Este es el nombre de la imagen
   */
  name: string;
  /**
   * Este es campo donde debe ir la imagen
   */
  src: string;
}

const KAvatar: FC<KAvatarProps> = ({ size, name, src }) => {
  return (
    <Wrap>
      <WrapItem>
        <Avatar size={size} name={name} src={src} />
      </WrapItem>
    </Wrap>
  );
};

export default KAvatar;
