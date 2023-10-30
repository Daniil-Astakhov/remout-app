export interface FormSchema {
	is_expiring: unknown | string;
	barcode?: string;
	bonus: string;
	sum: string;
	valid_at: string;
	expire_date: string | boolean | unknown;
	author: string;
	comment: string;
	region?: string;
}

export interface StateFormSchema {
	success: number;
	error: string;
	isSuccess: boolean;
}
