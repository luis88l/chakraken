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
  Box,
  Tfoot,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

export interface KTableLayoutProps<Data extends object> {
  data: Data[];
  columns: Array<ColumnDef<Data, any>>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function KPaginatedTable<Data extends object>({
  data,
  columns,
}: KTableLayoutProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Flex width="100%">
      <TableContainer display="flex" overflowY="scroll">
        <Table variant="simple" display="block">
          <Thead
            style={{
              position: "sticky",
              top: 0,
              insetBlockStart: 0,
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span pl="4">
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
                {row.getVisibleCells().map((cell) => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      fontSize="xs"
                      minWidth={210}
                      whiteSpace={"break-spaces"}
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
          <Tfoot style={{ position: "sticky", bottom: 0, insetBlockEnd: 0 }}>
            <Tr>
              <Th>
                <Box display="flex" justifyContent="flex-end">
                  hi
                </Box>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}