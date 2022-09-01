import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';
import { validate, ValidationError } from 'class-validator';
import { MongodbIdDto } from 'src/shared/validation/dto/mongodb-id.dto';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { StatusCodes } from 'http-status-codes';
import { ExpressRecipeRequest } from 'src/types/express/expressRecipeRequest.interface';
import { recipeService } from 'src/services/recipe.service';

export function validatorRecipeParamsId() {
	return async function (
		req: ExpressRecipeRequest,
		res: Response,
		next: NextFunction
	): Promise<OutgoingMessage> {
		try {
			const { id } = req.params;
			const errors: ValidationError[] = await validate(Object.assign(new MongodbIdDto(), id));
			const errorMessage = errors.reduce((acc, error) => {
				acc[error.property] = Object.values(error.constraints);
				return acc;
			}, {});

			if (Object.keys(errorMessage).length > 0) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, errorMessage);
			}

			const recipe = await recipeService.findOne({ _id: id });

			if (!recipe) {
				throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
			}

			req.recipe = recipe;
			next();
		} catch (e) {
			return res.status(e.code || 400).json({ ...e });
		}
	};
}