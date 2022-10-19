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
} from "@chakra-ui/react"
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useState } from "react"

export type KTableLayoutProps<Data extends object> = {
	data: Data[]
	columns: ColumnDef<Data, any>[]
}

export function KTableLayout<Data extends object>({
	data,
	columns,
}: KTableLayoutProps<Data>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	return (
		<Flex width="100%">
			<TableContainer width="100%">
				<Table variant="simple">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const meta: any = header.column.columnDef.meta
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
												{header.column.getIsSorted() ? (
													header.column.getIsSorted() === "desc" ? (
														<TriangleDownIcon aria-label="sorted descending" />
													) : (
														<TriangleUpIcon aria-label="sorted ascending" />
													)
												) : null}
											</chakra.span>
										</Th>
									)
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									const meta: any = cell.column.columnDef.meta
									return (
										<Td key={cell.id} isNumeric={meta?.isNumeric}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</Td>
									)
								})}
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	)
}
