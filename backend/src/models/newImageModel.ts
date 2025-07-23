import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export enum ImageType {
  PRODUCT_MAIN = 'product_main',
  PRODUCT_GALLERY = 'product_gallery',
  PRODUCT_VARIANT = 'product_variant',
  PROMOTION_BANNER = 'promotion_banner',
  CONTENT_BLOG = 'content_blog',
  CONTENT_ABOUT = 'content_about',
  USER_AVATAR = 'user_avatar',
  USER_REVIEW = 'user_review',
  UI_ICON = 'ui_icon',
  UI_BADGE = 'ui_badge',
  PLACEHOLDER = 'placeholder'
}

class ImageMetadata {
    @prop() position?: number;
    @prop() resolution?: string;
    @prop() file_size_kb?: number;
    @prop({ type: () => [String] }) tags?: string[];
    @prop() caption?: string;
}

@modelOptions({ schemaOptions: { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } })
export class Image {
    @prop({ required: true })
    url!: string;

    @prop({ default: '' })
    alt_text?: string;

    @prop({ required: true, enum: ImageType })
    type!: ImageType;

    @prop({ ref: 'Product' })
    product_id?: Ref<any>;

    @prop({ ref: 'Variant' })
    variant_id?: Ref<any>;

    @prop({ ref: 'User' })
    user_id?: Ref<any>;

    @prop({ ref: 'Blog' })
    blog_id?: Ref<any>;

    @prop({ ref: 'Promotion' })
    promotion_id?: Ref<any>;

    @prop({ _id: false })
    metadata?: ImageMetadata;
}

export const ImageModel = getModelForClass(Image);
