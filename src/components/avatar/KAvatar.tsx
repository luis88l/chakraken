import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";

export interface KAvatarProps {
  /**
   * Tamaño de la imagen
   * (full, 2xl, xl, lg, md, sm, xs, 2xs)
   */
  size: string;
  /**
   * Este es el nombre de la imagen
   */
  name: string;
  /**
   * Este es campo donde debe ir la imagen
   */
  src: string;
}

function KAvatar(props: KAvatarProps): any {
  console.log(props.size);
  return (
    <Wrap>
      <WrapItem>
        <Avatar size={props.size} name={props.name} src={props.src} />
      </WrapItem>
    </Wrap>
  );
}

export default KAvatar;
