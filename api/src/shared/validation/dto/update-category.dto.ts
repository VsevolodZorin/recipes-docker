import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ICategoryUpdate } from 'src/types/category/category.interface';
import { IsMongoIdString } from '../decorators/is-mongodb-id-string';

export class UpdateCategoryDto implements ICategoryUpdate {
	// todo

	@IsMongoIdString()
	// @IsMongoId()
	readonly id: string;

	@IsOptional()
	@IsString()
	readonly name?: string;

	@IsOptional()
	@IsString({ message: 'parentId must be a string or null' })
	readonly parentId?: string;
}