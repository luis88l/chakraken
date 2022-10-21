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
} from "@chakra-ui/react";

export interface KTableProps {
	/**
	 * Esta es la caption de la tabla
	 */
	Caption: string;
	/**
	 * Este es parte del contenido dentro de la tabla
	 */
	Content: string;
	/**
	 * Este es la descripcion de un campo en la tabla
	 */
	Description: string;
	/**
	 * Este es el estilo de la tabla (striped, simple, unstyled)
	 */
	Variant: string;
}

function KTable(props: KTableProps) {
	return (
		<TableContainer>
			<Table variant={props.Variant}>
				<TableCaption>{props.Caption}</TableCaption>
				<Thead>
					<Tr>
						<Th>{props.Description}</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{props.Content}</Td>
					</Tr>
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>{props.Description}</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
}

export default KTable;
