import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

class Description {
  @prop() short!: string;
  @prop() long!: string;
}

class Media {
  @prop() main_image!: {
    url: string;
    imageId?: Types.ObjectId;
    alt_text?: string; // optional, if you want to link to an Image document
  }  // allows for additional properties like resolution, size, etc. if needed
  @prop() gallery!: { 
    url: string; 
    imageId?: Types.ObjectId; 
    alt_text?: string 
  }[];
  @prop() video?: string;
  @prop() ar_model?: string;
  @prop() alt_text?: string;
}

class Pricing {
  @prop() price!: number;
  @prop() sale_price?: number;
  @prop() compare_at_price?: number;
  @prop() cost_per_item?: number;
  @prop() currency!: string;
  @prop() taxable!: boolean;
}

class Inventory {
  @prop() track_inventory!: boolean;
  @prop() stock_quantity!: number;
  @prop() allow_backorder!: boolean;
  @prop() warehouse_location?: string;
}

class VariantOptionValue {
  @prop() optionName!: string;
  @prop() optionValue!: string;
}

class Dimensions {
  @prop() length!: number;
  @prop() width!: number;
  @prop() height!: number;
}

class Shipping {
  @prop() weight!: number;
  @prop({ _id: false }) dimensions!: Dimensions;
  @prop() free_shipping!: boolean;
  @prop() shipping_class?: string;
  @prop({ enum: ['manual', '3PL', 'dropship'] }) fulfillment_method!: string;
}

class SEO {
  @prop() meta_title?: string;
  @prop() meta_description?: string;
  @prop() custom_url?: string;
  @prop() canonical_url?: string;
}
export type ExpirePolicy = 'never' | 'onDate';
class Publishing {
  @prop({ enum: ['draft', 'published', 'archived'] }) status!: string;
  @prop({ type: () => [String] }) visibility!: string[];
  @prop() publish_at?: Date;
    /** Expiration strategy: never expire vs. expire at a specific time */
  @prop({ enum: ['never', 'onDate'], default: 'never' })
  public expire_policy!: ExpirePolicy;

  /** When expire_policy === 'onDate', this must be set (UTC) */
  @prop()
  public expire_at?: Date;
    /** Helper: treat as active if published window has started and not expired */
  public isActive(at: Date = new Date()): boolean {
    if (this.status !== 'published') return false;
    if (this.publish_at && this.publish_at > at) return false;
    if (this.expire_policy === 'onDate' && this.expire_at && this.expire_at <= at) return false;
    return true;
  }
}

class ProductFAQ {
  @prop() question!: string;
  @prop() answer!: string;
}

class Additional {
  @prop({ type: Map, of: String }) custom_attributes?: Map<string, string>;
  @prop({ type: () => [Types.ObjectId] }) related_products?: Types.ObjectId[];
  @prop() return_policy?: string;
  @prop({ type: () => [ProductFAQ] }) product_faqs?: ProductFAQ[];
}

class VariantOption { // rename if you like
  @prop() optionName!: string;
  @prop() optionValues!: string[]; // or string[]
}

class Variant {
  public _id?: Types.ObjectId;

  @prop({ type: () => [VariantOptionValue] })
  public option_values!: VariantOptionValue[];
  @prop() public price!: number;
  @prop() public sku!: string;
  @prop() public uuid!: string;
  @prop() public barcode?: string;
  @prop() public stock_quantity!: number;
  @prop({ type: () => [String] }) public images?: string[];
}

/** Wraps all variant-related metadata */
class VariantMap {
  @prop({ default: false }) public isVariant?: boolean;

  // This is the critical line: array of Variant subdocs -> each gets its own _id automatically
  @prop({ type: () => [Variant] })
  public variants?: Variant[];

  @prop({ type: () => [VariantOption] })
  variantOptions?: VariantOption[];

  @prop() public variantGroupBy?: string;

  @prop({ type: () => [String] })
  public images?: string[];
}

@modelOptions({ schemaOptions: { timestamps: true } })
class ProductNew {
  @prop() name!: string;
  @prop() product_id!: string;
  @prop() slug!: string;
  @prop({ _id: false }) description?: Description;
  @prop({ enum: ['physical', 'digital', 'service'] }) type!: string;
  @prop() brand?: string;
  @prop() vendor?: string;
  @prop() sku?: string;
  @prop() storeId!: string;
  @prop() barcode?: string;
  @prop({ type: () => [String] }) categoryList?: string[];
  @prop({ type: () => [String] }) collections?: string[];
  @prop({ type: () => [String] }) tags?: string[];
  @prop({ _id: false }) media?: Media;
  @prop({ _id: false }) pricing?: Pricing;
  @prop({ _id: false }) inventory?: Inventory;
  // @prop({ type: () => [Variant], _id: false }) variants?: Variant[];
  @prop({ _id: false }) // single nested doc, no need for its own _id
  public variantMap?: VariantMap;
  @prop({ _id: false }) shipping!: Shipping;
  @prop({ _id: false }) seo?: SEO;
  @prop({ _id: false }) publishing!: Publishing;
  @prop({ _id: false }) additional?: Additional;
}

export const newProductModel = getModelForClass(ProductNew);