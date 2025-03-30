import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Store {
  public _id?: string

  // @prop({ required: true })
  @prop({ default: "" })
  public storeName?: string

  @prop({ required: true  })
  public storeOwner!: string

  @prop({ required: true  })
  public storeUsers?: []

  @prop({ required: true })
  public storeNumber!: number

  @prop({ required: true, default: 'draft' })
  public status?: string

  @prop({ required: true, default: false })
  public current?: boolean

  @prop({ default: "kg" })
  public weightUnit?: string
  
  @prop({ default: [] })
  public languages?: []
  
  @prop({ default: {} })
  public storeAddress?: {}

  @prop({ default: "" })
  public timeZone?: string
}

export const StoreModel = getModelForClass(Store)