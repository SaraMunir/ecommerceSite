import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'

/* ---------- Shared Enums ---------- */
enum StoreStatus {
  Draft = 'draft',
  Active = 'active',
  Paused = 'paused',
}

enum NavPosition {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

enum NavAlignment {
  Row = 'row',
  Column = 'column',
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
}

@modelOptions({ schemaOptions: { _id: false } })
class StoreTheme {
  @prop() public name!: string
  @prop() public vibe!: string
  @prop({ _id: false, type: () => ThemeColors }) public colors!: ThemeColors
  @prop({ _id: false, type: () => ThemeFonts }) public fonts!: ThemeFonts
}

/* ---------- Layout: Navigation ---------- */
/** Keep element structures flexible by using Mixed. 
 * If you want stricter typing later, replace `unknown` with specific sub-classes per element type.
 */
type MixedElement = Record<string, unknown>

@modelOptions({ schemaOptions: { _id: false } })
class NavigationSection {
  @prop() public name!: string
  @prop() public id!: string
  @prop() public description?: string
  @prop({ type: () => [String], default: undefined }) public fields?: string[]
  @prop({ enum: NavPosition }) public position!: NavPosition
  @prop({ type: () => [Object], default: [] }) public elements!: MixedElement[]
}

@modelOptions({ schemaOptions: { _id: false } })
class NavigationLayout {
  @prop({ enum: NavAlignment, default: NavAlignment.Row })
  public alignment!: NavAlignment

  @prop({ type: () => [NavigationSection], default: [] })
  public sections!: NavigationSection[]
}

@modelOptions({ schemaOptions: { _id: false } })
class Navigation {
  @prop() public logo?: string
  @prop({ _id: false, type: () => NavigationLayout })
  public layout!: NavigationLayout
}

/* ---------- Layout: Footer ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class FooterSocial {
  @prop() public platform!: string
  @prop() public url!: string
}

@modelOptions({ schemaOptions: { _id: false } })
class FooterLink {
  @prop() public label!: string
  @prop() public url!: string
}

@modelOptions({ schemaOptions: { _id: false } })
class Footer {
  @prop() public text!: string
  @prop({ type: () => [FooterSocial], default: [] }) public socials!: FooterSocial[]
  @prop({ type: () => [FooterLink], default: [] }) public links!: FooterLink[]
}

/* ---------- Layout: Site ---------- */
@modelOptions({ schemaOptions: { _id: false } })
class Site {
  @prop() public name!: string
  @prop() public baseUrl!: string
  @prop() public description?: string
  @prop({ _id: false, type: () => Navigation }) public navigation!: Navigation
  @prop({ _id: false, type: () => Footer }) public footer!: Footer
}

@modelOptions({ schemaOptions: { _id: false } })
class Layout {
  @prop({ _id: false, type: () => Site }) public site!: Site
}

/* ---------- Store ---------- */
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'stores',
  },
})
export class Store {
  public _id?: string

  @prop({ default: '' })
  public storeName?: string

  // Usually a reference to a User _id
  @prop({ required: true, ref: () => 'User' })
  public storeOwner!: Types.ObjectId | string

  // Team members with access
  @prop({ type: () => [Types.ObjectId], ref: () => 'User', default: [] })
  public storeUsers?: (Types.ObjectId | string)[]

  @prop({ required: true })
  public storeNumber!: number

  @prop({ required: true, enum: StoreStatus, default: StoreStatus.Draft })
  public status?: StoreStatus

  @prop({ required: true, default: false })
  public current?: boolean

  @prop({ default: 'kg' })
  public weightUnit?: string

  @prop({ type: () => [String], default: [] })
  public languages?: string[]

  @prop({ type: () => Object, default: {} })
  public storeAddress?: Record<string, unknown>

  @prop({ default: '' })
  public timeZone?: string

  @prop({ default: '' })
  public currency?: string

  /* NEW: Full theme object */
  @prop({ _id: false, type: () => StoreTheme })
  public storeTheme?: StoreTheme

  /* NEW: Full site layout */
  @prop({ _id: false, type: () => Layout })
  public layout?: Layout
}

export const StoreModel = getModelForClass(Store)