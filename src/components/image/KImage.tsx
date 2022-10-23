import { Image, Stack } from "@chakra-ui/react";

function KImage(): any {
  return (
    <Stack direction="row">
      <Image
        boxSize="100px"
        objectFit="cover"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
    </Stack>
  );
}

export default KImage;
