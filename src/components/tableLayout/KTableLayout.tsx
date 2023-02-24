import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

export interface KTableLayoutProps<Data extends object> {
  data: Data[];
  columns: Array<ColumnDef<Data, any>>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function KTableLayout<Data extends object>({
  data,
  columns,
}: KTableLayoutProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      sorting,
    },
  });
  return (
    <Flex>
      <TableContainer width="100%">
        <Table variant="simple" width="100%">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      style={{ position: "relative", width: header.getSize() }}
                      pr="0"
                      pl="0"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span>
                        {
                          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                          header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null
                        }
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={index}
                      isNumeric={meta?.isNumeric}
                      fontSize="xs"
                      minWidth={210}
                      whiteSpace={"break-spaces"}
                      style={{ width: cell.column.getSize() }}
                      pr="0"
                      pl="0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
