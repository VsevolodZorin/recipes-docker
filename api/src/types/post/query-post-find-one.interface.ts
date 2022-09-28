import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IQueryPostFindOne {
	_id?: string;
	title?: string;
	description?: string;
	body?: string;
	categoryid?: Ref<typeof Category, string>;
}