import { AddIcon } from "@chakra-ui/icons";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";

function KTag() {
  return (
    <HStack spacing={4}>
      {["sm", "md", "lg"].map((size) => (
        <Tag size={size} key={size} variant="subtle" colorScheme="cyan">
          <TagLeftIcon boxSize="12px" as={AddIcon} />
          <TagLabel>Cyan</TagLabel>
        </Tag>
      ))}
    </HStack>
  );
}

export default KTag;
