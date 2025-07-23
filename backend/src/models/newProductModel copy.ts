import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

class Description {
  @prop() short!: string;
  @prop() long!: string;
}

class Media {
  @prop() main_image!: string;
  @prop({ type: () => [String] }) gallery!: string[];
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
  @prop() key!: string;
  @prop() value!: string;
}

class Variant {
  @prop({ type: () => [VariantOptionValue] }) option_values!: VariantOptionValue[];
  @prop() price!: number;
  @prop() sku!: string;
  @prop() uuid!: string;
  @prop() barcode?: string;
  @prop() stock_quantity!: number;
  @prop({ type: () => [String] }) images?: string[];

//   barcode
// : 
// ""
// option_values
// : 
// (2) [{…}, {…}]
// price
// : 
// 0
// sku
// : 
// ""
// stock_quantity
// : 
// 2
// uuid
// : 
// "4659aed2-a259-468e-8ada-8bbe115b4036"
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

class Publishing {
  @prop({ enum: ['draft', 'published', 'archived'] }) status!: string;
  @prop({ type: () => [String] }) visibility!: string[];
  @prop() publish_at?: Date;
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

@modelOptions({ schemaOptions: { timestamps: true } })
class ProductNew {
  @prop() name!: string;
  @prop() slug!: string;
  @prop({ _id: false }) description?: Description;
  @prop({ enum: ['physical', 'digital', 'service'] }) type!: string;
  @prop() brand?: string;
  @prop() vendor?: string;
  @prop() sku?: string;
  @prop() storeId!: string;
  @prop() barcode?: string;
  @prop({ type: () => [String] }) categories?: string[];
  @prop({ type: () => [String] }) collections?: string[];
  @prop({ type: () => [String] }) tags?: string[];
  @prop({ _id: false }) media?: Media;
  @prop({ _id: false }) pricing?: Pricing;
  @prop({ _id: false }) inventory?: Inventory;
  // @prop({ type: () => [Variant], _id: false }) variants?: Variant[];
  @prop({ _id: false }) 
  public variantMap!: {
      isVariant?: boolean;
      variants?: Variant[];
      variantOptions?: { optionName: string; optionValue: any }[];
      variantGroupBy?: string;
      images?: string[];
  };
  @prop({ _id: false }) shipping!: Shipping;
  @prop({ _id: false }) seo?: SEO;
  @prop({ _id: false }) publishing!: Publishing;
  @prop({ _id: false }) additional?: Additional;
}

export const newProductModel = getModelForClass(ProductNew);