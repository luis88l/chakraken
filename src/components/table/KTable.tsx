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
  /**
   * Este es el estilo de la Tabla.
   */
  variant:
    | ResponsiveValue<(string & {}) | "simple" | "striped" | "unstyled">
    | undefined;
  /**
   * Caption de la tabla situado hasta abajo de ella (texto)
   */
  tablecaption: string;
  /**
   * Descripcion de columna de la tabla
   */
  descriptiontable: string;
  /**
   * Descripcion de columna de la tabla
   */
  secondDescription: string;
  /**
   * Contenido de la tabla
   */
  content: string;
  /**
   * Contenido de la tabla
   */
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
