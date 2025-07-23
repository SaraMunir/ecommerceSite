

export type descriptiontype = {
    short: string
    long: string
}
export type media = {
    main_image: string
    gallery: string[]
    video?: string
    ar_model?: string
    alt_text?: string
}
export type NewProductVariant = {
    barcode?: string,
    sku?: string,
    stock_quantity?: number,
    price?: number,
    uuid?: string,
    images?: string[],
    option_values?: {
        optionName: string,
        optionValues: string[]
    }
}
export type NewProduct ={
    [x: string]: any
    _id?: string
    name?: string
    slug?: string
    storeId?: string
    description?: descriptiontype
    type?: 'physical' | 'digital' | 'service',
    brand?: string
    vendor?: string
    sku?: string
    barcode?: string
    categories?: string[]
    collections?: string[]
    tags?: string[]
    media?: media
    pricing?: {
        price: number
        sale_price?: number
        compare_at_price?: number
        cost_per_item?: number
        currency: string
        taxable: boolean
    },
    inventory?: {
        track_inventory: boolean
        stock_quantity: number
        allow_backorder: boolean
        warehouse_location?: string
    },
    variantMap?: {
        isVariant?: boolean,
        variantGroupBy?: string,
        variantOptions?: {
            key: string
            values: string[]
        }[],
        variants?: NewProductVariant[]
    },
    // variants?: {
    //     option_values: {
    //         key: string
    //         value: string
    //     }[]
    //     price: number
    //     sku: string
    //     barcode?: string
    //     stock_quantity: number
    //     images?: string[]
    // }[]
}