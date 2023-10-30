export interface itemProductModalProp {
	article: string;
	product: string;
	discount: string;
	price: string;
	quantity: string;
	size: string;
	use_bonuses: string;
}

interface productDataModalProp {
	author: string;
	bonus: string;
	comment: string;
	expire_date: string;
	is_expiring: string;
	sum: string;
	state: string;
	status_id: string;
	created_at: string;
	realization_id: string;
	products: [];
	invoice: string;
}
export interface productModalProp {
	bonus: string;
	sum: string;
	date: string;
	reason: string;
	data: productDataModalProp;
	invoice: string;
	created_at: string;
	realization_id: string;
	products: [];
}
