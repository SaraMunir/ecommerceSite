import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps:true } })
export class Category {
    public _id?: string

    @prop({ required: true })
    public name!: string

    public title?: string
    
    public dispName?: string

    public image?: string

    @prop({ default: ''  })
    public description?: string

    @prop({  default: true })
    public status?: boolean

    @prop({ required: true, default: [] })
    public subCategories?: string[]
}

export const CategoryModel = getModelForClass(Category)