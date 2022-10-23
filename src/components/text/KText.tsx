import { Stack, Text } from "@chakra-ui/react";

interface KTextProps {
  fontSize?: string;
  content: string;
}

function KText(props: KTextProps): any {
  return (
    <Stack>
      <Text fontSize={props.fontSize}>{props.content}</Text>
    </Stack>
  );
}

export default KText;
