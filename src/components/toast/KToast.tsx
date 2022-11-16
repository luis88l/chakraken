import { Box, Button, useToast } from "@chakra-ui/react";
import { FC } from "react";

export interface KToastProps {
  btntext: string;
  color: string;
  p: string;
  bg: string;
  text: string;
}

const KToast: FC<KToastProps> = ({ color, p, bg, text, btntext }) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          position: "bottom-left",
          render: () => (
            <Box color={color} p={p} bg={bg}>
              {text}
            </Box>
          ),
        })
      }
    >
      {btntext}
    </Button>
  );
};

export default KToast;
