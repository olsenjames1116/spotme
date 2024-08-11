export interface User {
	username: string;
	balance: number;
	pic: string | null;
}

export interface Friend extends User {
	id: string;
}
