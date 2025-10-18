// models/Page.ts
import { prop, getModelForClass, modelOptions, Severity, index, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'

/* -------------------- Enums -------------------- */
export enum PageStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum Visibility {
  Private = 'private',      // only admins
  Unlisted = 'unlisted',    // accessible via URL
  Public = 'public',        // indexed/linked
}

export enum BlockType {
  Text = 'text',
  Image = 'image',
  Video = 'video',
  Button = 'button',
  ProductGrid = 'productGrid',
  Testimonial = 'testimonial',
  CTA = 'cta',
  Custom = 'custom',
}

export enum MediaKind {
  Image = 'image',
  Video = 'video',
}

/* -------------------- Value Objects -------------------- */

// Lightweight media reference kept inline for sections/backgrounds.
// For a central Image collection, store imageId and optionally url/alt as denormalized cache.
@modelOptions({ schemaOptions: { _id: false } })
class MediaRef {
  @prop() public url?: string
  @prop() public alt_text?: string
  @prop() public type?: string // e.g. 'promotion_banner'
  @prop() public imageId?: Types.ObjectId
  @prop({ default: false }) public show?: boolean
  // client-only fields like File objects should NOT live in DB; omit them here
}

@modelOptions({ schemaOptions: { _id: false } })
class VideoRef {
  @prop() public url?: string
  @prop({ default: false }) public show?: boolean
}

/** Visual background for a section */
@modelOptions({ schemaOptions: { _id: false } })
class SectionBackground {
  @prop() public image?: MediaRef
  @prop() public video?: VideoRef
//   @prop({ min: 0, max: 100, default: 100 }) public opacity?: number // 0..100
  @prop() public color?: string // fallback bg color (e.g. '#ffffff')
}

/** Grid settings for a section */
@modelOptions({ schemaOptions: { _id: false } })
class GridSettings {
  @prop({ min: 1, max: 48, default: 12 }) public rows!: number         // UI shows 12 by default
  @prop({ min: 1, max: 48, default: 24 }) public cols!: number         // fixed 24 in UI now, but configurable
  @prop({ min: 0, max: 32, default: 3 }) public gap?: number           // px gap between cells
}

/** Block payloads: store normalized properties + raw HTML if needed */
@modelOptions({ schemaOptions: { _id: false } })
class Font {
  @prop() public fontSize?: number 
  @prop() public fontStyle?: string 
  @prop() public fontFamily?: string 
  @prop() public fontFamilyId?: string 
  @prop() public fontColor?: string 
  @prop() public fontWeight?: number
  // store sanitized HTML your editor produces
}
/** Block payloads: store normalized properties + raw HTML if needed */
@modelOptions({ schemaOptions: { _id: false } })
class TextBlockData {
  @prop() public html?: string 
  @prop() public content?: string 
  @prop() public tag?: string 
  @prop() public font?: Font
  // store sanitized HTML your editor produces
}

@modelOptions({ schemaOptions: { _id: false } })
class ImageBlockData {
    @prop() public media!: MediaRef
    @prop() public width?: string // e.g. '100%'
    @prop() public linkHref?: string
}

@modelOptions({ schemaOptions: { _id: false } })
class VideoBlockData {
  @prop() public media!: VideoRef
}

@modelOptions({ schemaOptions: { _id: false } })
class ButtonBlockData {
  @prop() public label!: string
  @prop() public href!: string
  @prop() public variant?: 'primary' | 'secondary' | 'link'
}

/** A renderable block placed on the grid */
@modelOptions({ schemaOptions: { _id: false } })
class Block {
  @prop({ default: () => new Types.ObjectId().toString() }) public uid!: string
  @prop({ required: true, enum: BlockType }) public type!: BlockType
  // ordering within section
  @prop({ default: 0 }) public order?: number

  // Grid placement (1-indexed like your UI)
  @prop({ min: 1 }) public rowstart!: number
  @prop({ min: 1 }) public colstart!: number
  @prop({ min: 1, default: 1 }) public rowSpan!: number
  @prop({ min: 1, default: 1 }) public colSpan!: number

  // Variant payloads per type (keep optional; validate in service layer)
  @prop({ type: () => TextBlockData, _id: false }) public textBlock?: TextBlockData
  // @prop() public text?: TextBlockData
  @prop() public image?: ImageBlockData
  @prop() public video?: VideoBlockData
  @prop() public button?: ButtonBlockData

  // For legacy support w/ your current drag-drop that injects raw HTML
  @prop() public html?: string

  // Flags / UX
  @prop({ default: true }) public enabled?: boolean
}

/** One page section with grid + blocks */
@modelOptions({ schemaOptions: { _id: false } })
class Section {
    @prop({ default: () => new Types.ObjectId().toString() }) public id!: string
    @prop({ default: 0 }) public order!: number
    @prop({ default: 'Section' }) public name?: string
    @prop({ default: 'default' }) public gridDivs?: [] // reference key to your theme object
    @prop({ type: () => GridSettings, _id: false, default: () => ({ rows: 12, cols: 24, gap: 3 }) })
    public grid!: GridSettings

    @prop({ type: () => SectionBackground, _id: false }) public background?: SectionBackground

    @prop({ type: () => [Block], default: [] }) public blocks!: Block[]
    // Optional semantic subdivision marker (e.g., for future split layouts)
    @prop({ default: 0 }) public sectionDivision?: number
}

/** SEO & OpenGraph */
@modelOptions({ schemaOptions: { _id: false } })
class SeoMeta {
    @prop() public title?: string
    @prop() public description?: string
    @prop({ type: () => [String] }) public keywords?: string[]
    @prop() public canonical_url?: string
    @prop() public og_image_url?: string
}

/** Publishing window */
@modelOptions({ schemaOptions: { _id: false } })
class Publishing {
    @prop({ default: PageStatus.Draft, enum: PageStatus }) public status!: PageStatus
    @prop() public publish_at?: Date
    @prop() public expire_at?: Date
    @prop({ default: Visibility.Public, enum: Visibility }) public visibility!: Visibility
}

/** Versioned content: draft vs published */
@modelOptions({ schemaOptions: { _id: false } })
class PageContent {
    @prop({ type: () => [Section], default: [] }) public sections!: Section[]
    @prop() public notes?: string // editor notes/changelog message
}

/* -------------------- Page Root -------------------- */

@index({ storeId: 1, slug: 1 }, { unique: true })
@modelOptions({
    options: { allowMixed: Severity.ALLOW }, // allow flexible block payloads
    schemaOptions: {
        timestamps: true,
        versionKey: 'v', // optimistic concurrency
    },
})
export class Page {
    // Multistore / multitenant
    @prop({ required: true }) public storeId!: Types.ObjectId

    // Routing
    @prop({ required: true, trim: true }) public pageName!: string
    @prop({ required: true, trim: true }) public name!: string
    @prop({ required: true, lowercase: true, trim: true }) public slug!: string // e.g., 'home', 'about', 'promo/sale'

    // Placement & theming
    @prop({ default: 'default' }) public themeKey?: string // reference key to your theme object


    // Draft/Published separation: you edit draft; publisher copies to published
    // @prop({ type: () => PageContent, _id: false, default: () => ({ sections: [] }) })
    // public draft!: PageContent

    // @prop({ type: () => PageContent, _id: false}) public published?: PageContent

    @prop({ type: () => PageContent, _id: false, default: {} }) public pageContent!: PageContent
    @prop({ type: () => SeoMeta, _id: false, default: {} }) public seo!: SeoMeta
    @prop({ type: () => Publishing, _id: false, default: {} }) public publishing!: Publishing

    // System
    @prop() public createdBy?: Types.ObjectId
    @prop() public updatedBy?: Types.ObjectId
    @prop({ default: false }) public isSystemPage?: boolean // e.g., 404, cart, checkout

    // // Guard rails (optional): ensure expire_at >= publish_at
    // public static validatePublishing(p: Page) {
    //     const pub = p.publishing
    //     if (pub?.publish_at && pub?.expire_at && pub.expire_at < pub.publish_at) {
    //     throw new Error('expire_at cannot be earlier than publish_at')
    //     }
    // }
}

export const PageModel = getModelForClass(Page)

/* -------------------- Helper Mappers (UI ↔ Model) -------------------- */

/** Convert your current UI "section" shape → Section (model) */
export function uiSectionToModel(uiSection: any): Section {
  // UI currently derives gridDivs; in the model we only save settings, not every cell.
    return {
        uid: uiSection.id ?? new Types.ObjectId().toString(),
        order: uiSection.order ?? 0,
        name: uiSection.name ?? 'Section',
        grid: {
        rows: Number(uiSection.rowNum ?? 12),
        cols: 24,
        gap: Number(uiSection.gap ?? 3),
        },
        background: {
        image: uiSection.bgImage?.url
            ? {
                url: uiSection.bgImage.url,
                alt_text: uiSection.bgImage.alt_text,
                type: uiSection.bgImage.type,
                show: !!uiSection.bgImage.show,
                imageId: uiSection.bgImage._id ? new Types.ObjectId(uiSection.bgImage._id) : undefined,
            }
            : undefined,
        video: uiSection.videoUrl?.url ? { url: uiSection.videoUrl.url, show: !!uiSection.videoUrl.show } : undefined,
        opacity: uiSection.bgOpacity ?? 100,
        },
        blocks: (uiSection.blocks ?? []).map((b: any) => ({
        uid: b.id ?? new Types.ObjectId().toString(),
        type: (b.type ?? 'Custom') as BlockType,
        rowstart: Number(b.rowstart),
        colstart: Number(b.colstart),
        rowSpan: Number(b.rowSpan ?? 1),
        colSpan: Number(b.colSpan ?? 1),
        html: b.html, // keep for legacy text; you can also parse into text.image/video/button payloads
        enabled: b.blockadded !== false,
        })),
        sectionDivision: Number(uiSection.sectionDivision ?? 0),
    }
}

// /** Convert your current UI page "sections" array into Page.draft.sections */
// export function uiSectionsToDraft(sections: any[]): PageContent {
//   return { sections: sections.map(uiSectionToModel) }
// }

/** Copy draft → published (simple publisher) */
export async function publishPage(pageId: Types.ObjectId, userId?: Types.ObjectId) {
  const page = await PageModel.findById(pageId)
  if (!page) throw new Error('Page not found')
  Page.validatePublishing(page)
  page.published = JSON.parse(JSON.stringify(page.draft)) // deep clone
  page.publishing.status = PageStatus.Published
  page.updatedBy = userId
  await page.save()
  return page
}
