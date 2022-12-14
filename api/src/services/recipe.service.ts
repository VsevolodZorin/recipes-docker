import { recipeModel } from 'src/models/recipe.model';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';
import { IQueryRecipeFindOne } from 'src/types/recipe/query-recipe-find-one.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';

export class RecipeService {
	find(query: IQueryRecipeFindMany = {}): Promise<IRecipe[]> {
		return recipeModel.find(query);
	}

	findOne(query: IQueryRecipeFindOne): Promise<IRecipe> {
		return recipeModel.findOne(query);
	}

	findByCategoryId(id: string) {
		return recipeModel.findByCategoryId(id);
	}

	paginationByCategoryId(categoryId: string, skip: number, limit: number): Promise<IRecipe[]> {
		return recipeModel.paginationByCategoryId(categoryId, skip, limit);
	}

	create(dto: IRecipeCreate): Promise<IRecipe> {
		return recipeModel.create(dto);
	}

	update(id: string, dto: IRecipeUpdate): Promise<IRecipe> {
		return recipeModel.update(id, dto);
	}

	delete(id: string): Promise<IRecipe> {
		return recipeModel.delete(id);
	}

	deleteManyByCategoryId(categoryId: string) {
		return recipeModel.deleteManyByCategoryId(categoryId);
	}
}

export const recipeService = new RecipeService();
