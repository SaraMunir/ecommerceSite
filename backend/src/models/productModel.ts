import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps:true } })
export class Product {
    public _id?: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true, unique: true })
    public slug!: string

    @prop({ required: true })
    public image!: string

    @prop({ required: true })
    public category!: string

    @prop({ required: true })
    public description!: string

    @prop({ required: true, default: 0 })
    public price!: number

    @prop({ required: true, default: 0 })
    public countInStock!: number

    @prop({ required: true, default: false })
    public hasVariants?: boolean

    @prop({ required: true, default: [] })
    public variesBy?: string[]
}

export const ProductModel = getModelForClass(Product)