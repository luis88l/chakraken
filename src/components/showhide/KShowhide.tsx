import { Box, Hide } from "@chakra-ui/react";
import { FC } from "react";

export interface KShowhideProps {
  below: string;
  text: string;
}

const KShowhide: FC<KShowhideProps> = ({ below, text }) => {
  return (
    <>
      <Hide below={below}>
        <Box>{text}</Box>
      </Hide>
    </>
  );
};

export default KShowhide;
