import { UpdateWriteOpResult } from 'mongoose';
import { Category } from 'src/schema/Category';
import {
	ICategory,
	ICategoryCreate,
	ICategoryUpdate,
	ICategoryUpdateMany,
} from 'src/types/category/category.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';
import { EntityStatusEnum } from 'src/types/entity-status.enum';
import cacheManager from 'src/utils/cache.manager';
import eventsManager from 'src/utils/evens.manager';

class CategoryModel {
	find(query = {}): Promise<ICategory[]> {
		return cacheManager.category.find<ICategory[]>(query, () =>
			Category.find({ ...query, status: EntityStatusEnum.ACTIVE }).exec()
		);
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return cacheManager.category.findOne<ICategory>(query, () =>
			Category.findOne({ ...query, status: EntityStatusEnum.ACTIVE }).exec()
		);
	}

	create(createCategoryDto: ICategoryCreate): Promise<ICategory> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return new Category(createCategoryDto).save();
	}

	update(id: string, dto: ICategoryUpdate): Promise<ICategory> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Category.findOneAndUpdate(
			{ _id: id, status: EntityStatusEnum.ACTIVE },
			{ $set: { ...dto } },
			{ new: true }
		).exec();
	}

	changeStatus(id: string, status: EntityStatusEnum): Promise<ICategory> {
		return Category.findOneAndUpdate(
			{ _id: id, status: EntityStatusEnum.ACTIVE },
			{ $set: { status } },
			{ new: true }
		).exec();
	}

	// todo check tests after change type Object to ICategoryUpdate
	updateMany(ids: string[], update: ICategoryUpdateMany): Promise<UpdateWriteOpResult> {
		return cacheManager.flushAllWithFetcher<UpdateWriteOpResult>(() =>
			Category.updateMany({ _id: { $in: ids }, status: EntityStatusEnum.ACTIVE }, update).exec()
		);
	}

	updateManyByParentId(
		parentId: string,
		update: ICategoryUpdateMany
	): Promise<UpdateWriteOpResult> {
		return cacheManager.flushAllWithFetcher<UpdateWriteOpResult>(() =>
			Category.updateMany({ parentId, status: EntityStatusEnum.ACTIVE }, update).exec()
		);
	}

	delete(id: string): Promise<ICategory> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Category.findByIdAndDelete(id).exec();
	}

	deleteAll() {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Category.deleteMany();
	}
}

export const categoryModel = new CategoryModel();
