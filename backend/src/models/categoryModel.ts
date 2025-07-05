import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps:true } })
export class Category {
    public _id?: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public storeId!: string

    public title?: string
    
    public dispName?: string

    public image?: string

    @prop({ default: ''  })
    public description?: string

    @prop({ default: ''  })
    public parentId?: string

    @prop({  default: true })
    public status?: boolean

    @prop({ default: [] })
    public parentCategories?: string[]

    @prop({ required: true, default: [] })
    public subCategories?: string[]
}

export const CategoryModel = getModelForClass(Category)