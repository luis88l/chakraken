// paginator that is used in the table layout component, can create all the pages and the buttons to go to the next page or the previous page and also the buttons to go to the first page or the last page
//
import React from "react";
import { Button, HStack } from "@chakra-ui/react";

interface Props {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  pageIndex: number;
  pageOptions: any[];
}

const KTableLayoutPaginator: React.FC<Props> = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageIndex,
  pageOptions,
}) => {
  return (
    <HStack>
      <Button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        colorScheme="blue"
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        colorScheme="blue"
      >
        {"<"}
      </Button>
      <Button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        colorScheme="blue"
      >
        {">"}
      </Button>
      <Button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        colorScheme="blue"
      >
        {">>"}
      </Button>
    </HStack>
  );
};

export default KTableLayoutPaginator;
