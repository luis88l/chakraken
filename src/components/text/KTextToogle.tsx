// create a component that will show view more or view less if the text is too long
// and will show the full text when clicked

import React, { useState } from "react";
import { Text } from "@chakra-ui/react";

interface Props {
  text: string;
  maxLength: number;
}

const KTextToogle: React.FC<Props> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleTruncate = (): any => {
    setIsTruncated(!isTruncated);
  };

  if (text.length <= maxLength) {
    return <Text>{text}</Text>;
  }

  if (isTruncated) {
    return (
      <Text onClick={handleTruncate} cursor="pointer">
        {text.slice(0, maxLength)} ...
      </Text>
    );
  } else {
    return (
      <Text onClick={handleTruncate} cursor="pointer">
        {text}
      </Text>
    );
  }
};

export default KTextToogle;
