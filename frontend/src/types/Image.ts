
export type ImageDetail = {
    filename?: string;
    name?: string;
    mime?: string;
    extension?: string;
    url?: string;
}
export type ImageMetadata = {
        position?: number;
        resolution?: string;
        file_size_kb?: number;
        tags?: string[];
        caption?: string;
}
export type Image ={
    _id: string;
    url: string;
    alt_text: string;
    type: 'product_main' | 'product_gallery' | 'product_variant' | 'promotion_banner' | 'content_blog' | 'content_about' | 'user_avatar' | 'user_review' | 'ui_icon' | 'ui_badge' | 'placeholder';
    product_id?: string; // Reference to Product
    variant_id?: string; // Reference to Variant
    user_id?: string; // Reference to User
    blog_id?: string; // Reference to Blog  
    promotion_id?: string; // Reference to Promotion
    metadata?: ImageMetadata; // Additional metadata
    storeId?: string; // Reference to Store
    mainImage?: ImageDetail; // Main image details
    medium?: ImageDetail; // Medium image details
    thumbnail?: ImageDetail; // Thumbnail image details
};