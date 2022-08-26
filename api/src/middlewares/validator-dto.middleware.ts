import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { OutgoingMessage } from 'http';
import { createCategoryDto } from 'src/types/category/create-category.dto';
import { updateCategoryDto } from 'src/types/category/update-category.dto';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';

export function validatorDto(
  DataTransferObject: typeof createCategoryDto | typeof updateCategoryDto
) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      const errors: ValidationError[] = await validate(Object.assign(DataTransferObject, req.body));
      const errorMessage = errors.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints);
        return acc;
      }, {});

      if (Object.keys(errorMessage).length > 0) {
        throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, errorMessage);
      }

      next();
    } catch (e) {
      return res.status(e.statusCode).json({ ...e });
    }
  };
}
