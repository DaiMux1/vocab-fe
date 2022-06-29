export type Vocab = {
	word: string;
	meaning: string;
	example: string;
};

export type CreateList = {
	name: string;
	vocab: Vocab[];
};
