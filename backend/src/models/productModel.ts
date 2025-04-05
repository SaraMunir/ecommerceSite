import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps:true } })
export class Product {
    public _id?: string

    @prop({ required: true })
    public name!: string

    public title?: string

    @prop({ default: "draft" })
    public status!: string
    
    @prop({ required: true })
    public storeId!: string

    @prop({ default: [] })
    public imageList?: any[]
    
    @prop({ default: '' })
    public image?: string

    @prop({ required: true })
    public category!: string

    @prop({ required: true })
    public description!: string

    @prop({ required: true, default: 0 })
    public price!: number

    @prop({  default: true })
    public shipping!: boolean

    @prop({ required: true, default: 0 })
    public inventory!: number

    @prop({ default: 0 })
    public quantitySold?: number

    @prop({ default: 0 })
    public quantityReservedInCart?: number

    @prop({ required: true, default: false })
    public hasVariants?: boolean

    @prop({ required: true, default: [] })
    public variesBy?: string[]
}

export const ProductModel = getModelForClass(Product)