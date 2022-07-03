import { Author } from './user';

export type Vocab = {
	word: string;
	meaning: string;
	example: string;
};

export type CreateList = {
	name: string;
	vocab: Vocab[];
};

export type ListReturn = {
	id: string;
	name: string;
	public: number;
	star: number;
	author: Author;
	vocab: Vocab[];
};

export type UpdateVocabInList = {
	name: string;
	oldVocab: Vocab;
	newVocab: Vocab;
};
