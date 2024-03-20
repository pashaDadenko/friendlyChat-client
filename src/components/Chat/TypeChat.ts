export type SearchParams = {
	[k: string]: string;
};

export type ChatMessage = {
	user: { name: string };
	message: string;
};
