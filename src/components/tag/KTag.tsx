import { AddIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon, ResponsiveValue } from "@chakra-ui/react";
import { FC } from "react";

export interface KTagProps {
  size: string;
  /**
   * Este es el estilo del Tag.
   */
  variant:
    | ResponsiveValue<"outline" | (string & {}) | "subtle" | "solid">
    | undefined;
  /**
   * Este es el color del Tag.
   */
  colorScheme:
    | (string & {})
    | "twitter"
    | "blue"
    | "cyan"
    | "gray"
    | "green"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow"
    | "whiteAlpha"
    | "blackAlpha"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "telegram"
    | undefined;
  /**
   * Este es el tamaño del icono que acompaña al Tag.
   */
  boxSize: string;
  /**
   * Este es el titulo del Tag.
   */
  title: string;
}

const KTag: FC<KTagProps> = ({
  variant,
  colorScheme,
  boxSize,
  title,
  size,
}) => {
  return (
    <Tag size={size} key={size} variant={variant} colorScheme={colorScheme}>
      <TagLeftIcon boxSize={boxSize} as={AddIcon} />
      <TagLabel> {title} </TagLabel>
    </Tag>
  );
};

export default KTag;
