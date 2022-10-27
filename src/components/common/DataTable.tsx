import DataTable from "react-data-table-component";
import React from "react";
import { customStyles } from "../../config/styles/customStyles";

export interface DataTableProps {
	columns: Array<any>;
	data: Array<any>;
	onChangePage?: any;
	selectableRows?: boolean;
	paginationTotalRows?: number;
	paginationDefaultPage?: number;
	onSelectedRowsChange?: any;
	limit?: number;
	onChangeRowsPerPage?: (limit: number, page: number) => void;
}

const Table: React.FC<DataTableProps> = ({
	selectableRows = false,
	...props
}) => {
	return (
		<DataTable
			onSelectedRowsChange={props.onSelectedRowsChange}
			selectableRows={selectableRows}
			columns={props.columns}
			data={props.data}
			pagination={true}
			paginationServer={true}
			paginationPerPage={props.limit || 10}
			paginationRowsPerPageOptions={[10, 50, 100, 250]}
			onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
				if (props.onChangeRowsPerPage) {
					props.onChangeRowsPerPage(currentRowsPerPage, currentPage);
				}
			}}
			customStyles={customStyles}
			paginationTotalRows={props.paginationTotalRows}
			onChangePage={props.onChangePage}
			noHeader={true}
			paginationDefaultPage={
				props.paginationDefaultPage === 0
					? 1
					: props.paginationDefaultPage
			}
		/>
	);
};
export default Table;
