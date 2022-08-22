import { getModelForClass, Prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// todo add index
export class CategorySchema extends TimeStamps {
  @Prop({ required: true, trim: true })
  public name: string;

  @Prop({ trim: true, type: () => String || null })
  public parentId: string | null;
}

export const Category: ReturnModelType<typeof CategorySchema> = getModelForClass(CategorySchema);