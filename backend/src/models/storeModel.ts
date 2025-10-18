import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
/* ---------- Shared ---------- */
function objectIdString() {
  return new Types.ObjectId().toString()
}

/* ---------- Theme ---------- */
class ThemeColors {
  @prop() public primary!: string
  @prop() public secondary!: string
  @prop() public accent!: string
  @prop() public background!: string
  @prop() public text!: string
}

class ThemeFonts {
  @prop() public heading!: string
  @prop() public body!: string
  @prop() public headingId!: string
  @prop() public bodyId!: string
}

@modelOptions({ schemaOptions: { _id: false } })
class StoreTheme {
  @prop() public id!: string
  @prop() public name!: string
  @prop() public vibe!: string
  @prop({ _id: false, type: () => ThemeColors }) public colors!: ThemeColors
  @prop({ _id: false, type: () => ThemeFonts }) public fonts!: ThemeFonts
}

/* ---------- Blocks ---------- */
enum BlockType {
  Hero = 'hero',
  Text = 'text',
  Heading = 'heading',
  Image = 'image',
  Video = 'video',
  ProductGrid = 'productGrid',
  Testimonial = 'testimonial',
  CTA = 'cta',
}

@modelOptions({ schemaOptions: { _id: false } })
class BlockBase {
  @prop({ default: objectIdString }) public uid!: string
  @prop({ default: 0 }) public order!: number
  @prop({ required: true, enum: BlockType }) public type!: BlockType
  @prop({ default: true }) public enabled?: boolean
}

/* Example block types (extend BlockBase) */
@modelOptions({ schemaOptions: { _id: false } })
class HeroBlock extends BlockBase {
  @prop() public heading?: string
  @prop() public subheading?: string
  @prop() public mediaUrl?: string
  @prop() public ctaLabel?: string
  @prop() public ctaHref?: string
}

@modelOptions({ schemaOptions: { _id: false } })
class TextBlock extends BlockBase {
  @prop() public heading?: string
  @prop() public bodyHtml?: string
}

@modelOptions({ schemaOptions: { _id: false } })
class ImageBlock extends BlockBase {
  @prop() public src!: string
  @prop() public alt?: string
  @prop() public caption?: string
}

type AnyBlock = HeroBlock | TextBlock | ImageBlock | BlockBase // Extend with other block types as needed

/* ---------- background ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class Background {
  @prop() public type!: 'color' | 'image' | 'gradient' | 'video'
  @prop() public value!: string

}
/* ---------- design ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class Design {
  @prop() public value!: string

}
/* ---------- Sections ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class BodySection {
  @prop({ default: objectIdString }) public uid!: string
  @prop({ default: 0 }) public order!: number
  @prop({ required: true }) public name!: string
  @prop({ _id: false, type: () => Design }) public design?: Design
  @prop({ _id: false, type: () => Background }) public background?: Background
  @prop({ default: 'full' }) public width?: 'full' | 'contained'
  // @prop({ default: 'none' }) public background?: 'none' | 'primary' | 'secondary' | 'accent' | 'image'
  @prop({ type: () => [Object], default: [] }) public blocks!: AnyBlock[]
}

/* ---------- Pages ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class PageSeo {
  @prop() public title?: string
  @prop() public description?: string
  @prop({ type: () => [String], default: [] }) public keywords?: string[]
}

@modelOptions({ schemaOptions: { _id: false } })
class Page {
  @prop({ default: objectIdString }) public uid!: string
  @prop({ default: 0 }) public order!: number
  @prop({ required: true }) public slug!: string
  @prop({ required: true }) public title!: string
  @prop({ _id: false, type: () => PageSeo }) public seo?: PageSeo
  @prop({ type: () => [BodySection], default: [] }) public body!: BodySection[]
}

/* ---------- Navigation ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class NavigationSection {
  @prop({ default: objectIdString }) public uid!: string
  @prop({ default: 0 }) public order!: number
  @prop() public name!: string
  @prop() public id!: string
  @prop({ type: () => [Object], default: [] }) public elements!: Record<string, unknown>[]
}

@modelOptions({ schemaOptions: { _id: false } })
class NavigationLayout {
  @prop({ default: 'row' }) public alignment!: 'row' | 'column'
  @prop({ type: () => [NavigationSection], default: [] }) public sections!: NavigationSection[]
}

@modelOptions({ schemaOptions: { _id: false } })
class Navigation {
  @prop() public logo?: string
  @prop({ _id: false, type: () => NavigationLayout }) public layout!: NavigationLayout
}

/* ---------- Footer ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class FooterLink {
  @prop() public label!: string
  @prop() public url!: string
}
/* ---------- PageSetup ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class Pages {
  @prop() public homepage!: Page
  @prop() public catalog!: Page
  @prop() public about!: Page
  @prop() public contact!: Page
  @prop() public faq!: Page 
  @prop() public category!: Page 
  @prop({ type: () => [Page], default: [] }) public customPages!: Page[]
  // @prop() public url!: string
}

@modelOptions({ schemaOptions: { _id: false } })
class Footer {
  @prop() public text!: string
  @prop({ type: () => [FooterLink], default: [] }) public links!: FooterLink[]
}
// /* ---------- Site ---------- */
// @modelOptions({ schemaOptions: { _id: false } })
// class Site {
//   @prop() public name!: string
//   @prop() public baseUrl!: string
//   @prop() public description?: string
//   @prop({ _id: false, type: () => Navigation }) public navigation!: Navigation
//   @prop({ _id: false, type: () => Footer }) public footer!: Footer
//   @prop({ type: () => [Page], default: [] }) public pages!: Page[]
// }
/* ---------- Layout ---------- */
@modelOptions({ schemaOptions: { _id: false } })
// layout for the store (navigation, footer, pages, etc.)
class Layout {
  @prop() public name!: string
  @prop() public baseUrl!: string
  @prop() public description?: string
  @prop({ _id: false, type: () => Navigation }) public navigation!: Navigation
  @prop({ _id: false, type: () => Footer }) public footer!: Footer
  @prop({ _id: false, type: () => Pages }) public layout?: Pages
  // @prop({ type: () => [Page], default: [] }) public pages!: Page[]
}

/* ---------- Store ---------- */
@modelOptions({ schemaOptions: { collection: 'stores', timestamps: true } })
export class Store {
  public _id?: string

  @prop() public storeName?: string
  @prop({ required: true }) public storeOwner!: string
  @prop({ type: () => [String], default: [] }) public storeUsers?: string[]
  @prop({ required: true }) public storeNumber!: number
  @prop({ default: 'draft' }) public status?: string
  @prop({ default: false }) public current?: boolean
  @prop({ default: 'kg' }) public weightUnit?: string
  @prop({ type: () => [String], default: [] }) public languages?: string[]
  @prop({ type: () => Object, default: {} }) public storeAddress?: Record<string, unknown>
  @prop() public timeZone?: string
  @prop() public currency?: string
  @prop({ _id: false, type: () => StoreTheme }) public storeTheme?: StoreTheme
  // layout for the store (navigation, footer, pages, etc.)
  @prop({ _id: false, type: () => Layout }) public layout?: Layout
}

export const StoreModel = getModelForClass(Store)