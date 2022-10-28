import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KTableProps {
  variant:
    | ResponsiveValue<(string & {}) | "simple" | "striped" | "unstyled">
    | undefined;
  tablecaption: string;
  descriptiontable: string;
  secondDescription: string;
  content: string;
  secondContent: string;
}

const KTable: FC<KTableProps> = ({
  variant,
  tablecaption,
  descriptiontable,
  secondDescription,
  content,
  secondContent,
}) => {
  return (
    <TableContainer>
      <Table variant={variant}>
        <TableCaption> {tablecaption} </TableCaption>
        <Thead>
          <Tr>
            <Th>{descriptiontable}</Th>
            <Th>{secondDescription}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{content}</Td>
            <Td>{secondContent}</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>{descriptiontable}</Th>
            <Th>{secondDescription}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default KTable;
