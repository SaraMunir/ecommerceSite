import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
  // admin type : 
  // site AdminUsers
  // product AdminUser
  // owner AdminUser
  // customer support AdminUser
  // marketer AdminUser
  // seller AdminUser

@modelOptions({ schemaOptions: { timestamps: true } })
export class AdminUser {
  public _id?: string
  @prop({ required: true })
  public firstName!: string
  @prop({ required: true })
  public lastName!: string
  @prop({ required: true, unique: true })
  public email!: string
  @prop({ required: true })
  public password!: string
  @prop({ required: true })
  public stores?: string[]
  @prop({ required: true})
  public adminType!: string
}

export const AdminUserModel = getModelForClass(AdminUser)