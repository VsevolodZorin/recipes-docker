import { UpdateWriteOpResult } from 'mongoose';
import { Recipe } from 'src/schema/Recipe';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';
import { IQueryRecipeFindOne } from 'src/types/recipe/query-recipe-find-one.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';

class RecipeModel {
	find(query: IQueryRecipeFindMany): Promise<IRecipe[]> {
		return Recipe.find(query).exec();
	}

	findOne(query: IQueryRecipeFindOne): Promise<IRecipe> {
		return Recipe.findOne(query).exec();
	}

	create(dto: IRecipeCreate): Promise<IRecipe> {
		return new Recipe(dto).save();
	}

	update(id: string, dto: IRecipeUpdate): Promise<IRecipe> {
		return Recipe.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	// todo type
	updateMany(ids: string[], update: IRecipeUpdate): Promise<UpdateWriteOpResult> {
		return Recipe.updateMany({ id: { $in: ids } }, update).exec();
	}

	delete(id: string): Promise<IRecipe> {
		return Recipe.findByIdAndDelete(id).exec();
	}
}

export const recipeModel = new RecipeModel();
