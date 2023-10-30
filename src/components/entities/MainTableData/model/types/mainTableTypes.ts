type PaginationType = {
	last: number | string;
	pag: string | number;
};

export interface TableType {
	table: [];
	pagination: PaginationType[];
}

export interface TableSchema {
	table: any;
	success: any;
	error: any;
	searchValue: string | number;
	pag: string | number;
	pagination: PaginationType[];
	region: string;
}
