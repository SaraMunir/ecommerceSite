import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps:true } })
export class newCategory {
    public _id?: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public storeId!: string
    
    public dispName?: string

    public image?: string

    @prop({ default: ''  })
    public description?: string

    @prop({ default: ''  })
    public parentId?: string

    @prop({  default: 'active' })
    public status?: string

    @prop({ required: true, default: [] })
    public subCategories?: string[]
}

export const NewCategoryModel = getModelForClass(newCategory)