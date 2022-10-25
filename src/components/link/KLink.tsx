import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function KLink(): any {
  return (
    <Link href="https://chakra-ui.com" isExternal>
      Chakra Design system <ExternalLinkIcon mx="2px" />
    </Link>
  );
}

export default KLink;
