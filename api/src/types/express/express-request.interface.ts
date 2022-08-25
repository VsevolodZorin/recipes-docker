import { Request } from 'express';
import { CreateCategoryDto } from '../category/create-category.dto';
import { UpdateCategoryDto } from '../category/update-category.dto';

export interface ExpressRequest extends Request {
  category?: typeof CreateCategoryDto | typeof UpdateCategoryDto;
}
