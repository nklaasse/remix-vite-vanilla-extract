import { StoryblokStory } from "storyblok-generate-ts";

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: unknown;
  text?: string;
  [k: string]: unknown;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: unknown;
  };
  is_external_url?: boolean;
  [k: string]: unknown;
}

export interface AuthorStoryblok {
  name: string;
  description: RichtextStoryblok;
  picture: AssetStoryblok;
  _uid: string;
  component: "author";
  [k: string]: unknown;
}

export interface BlogHeaderStoryblok {
  name: string;
  description: string;
  illustration: AssetStoryblok;
  _uid: string;
  component: "blogHeader";
  [k: string]: unknown;
}

export interface BlogImageStoryblok {
  imageContent: AssetStoryblok;
  _uid: string;
  component: "blogImage";
  [k: string]: unknown;
}

export interface BlogNavigationStoryblok {
  links: LinkStoryblok[];
  _uid: string;
  component: "blogNavigation";
  [k: string]: unknown;
}

export interface BlogPostStoryblok {
  author: StoryblokStory<AuthorStoryblok> | string;
  title: string;
  excerpt: string;
  featuredImage: AssetStoryblok;
  subject:
    | StoryblokStory<BlogCategoryStoryblok>
    | StoryblokStory<BlogSubjectStoryblok>
    | string;
  richText?: RichtextStoryblok;
  _uid: string;
  component: "blogPost";
  [k: string]: unknown;
}

export interface BlogPostSliderStoryblok {
  link?: LinkStoryblok[];
  sliderItems: (StoryblokStory<BlogPostStoryblok> | string)[];
  title: string;
  _uid: string;
  component: "blogPostSlider";
  [k: string]: unknown;
}

export interface BlogSubjectStoryblok {
  header: BlogHeaderStoryblok[];
  _uid: string;
  component: "blogSubject";
  [k: string]: unknown;
}

export interface ContactStoryblok {
  pageTitle: string;
  companyCoC: string;
  companyImage: AssetStoryblok;
  supportCards: SupportCardStoryblok[];
  faqTitle?: string;
  faqList: FaqItemStoryblok[];
  companyCountryAddress: string;
  pageSubtitle: string;
  companyCityAddress: string;
  companyStreetAddress: string;
  companyName: string;
  companyDetailsTitle: string;
  _uid: string;
  component: "contact";
  [k: string]: unknown;
}

export interface ContactInfoStoryblok {
  component: "contactInfo";
  title: string;
  subtitle: string;
  contactCards: ContactCardStoryblok[];
}

export interface ContactCompanyDetailsStoryblok {
  title: string;
  name: string;
  streetAddress: string;
  cityAddress: string;
  countryAddress: string;
  chamberOfCommerce: string;
  image: AssetStoryblok;
  _uid: string;
  component: "contactCompanyDetails";
  [k: string]: unknown;
}

export interface ContactEmailFormStoryblok {
  sectionTitle: string;
  description: RichtextStoryblok;
  formTitle: string;
  firstName: TextFieldStoryblok[];
  email: TextFieldStoryblok[];
  subject: PickerFieldStoryblok[];
  message: TextFieldStoryblok[];
  buttonLabel: string;
  _uid: string;
  component: "contactEmailForm";
  [k: string]: unknown;
}

export interface ContactFaqStoryblok {
  title: string;
  faqList: FaqItemStoryblok[];
  _uid: string;
  component: "contactFaq";
  [k: string]: unknown;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: unknown;
}[];

export interface CtaSectionStoryblok {
  title: string;
  text: RichtextStoryblok;
  tag?: string;
  image: MultiassetStoryblok;
  imageDecorator: "none" | "grayFrame";
  link?: LinkStoryblok[];
  direction: "start" | "end";
  _uid: string;
  component: "ctaSection";
  [k: string]: unknown;
}

export interface FaqItemStoryblok {
  label: string;
  content: RichtextStoryblok;
  _uid: string;
  component: "faqItem";
  [k: string]: unknown;
}

export interface FooterStoryblok {
  title: string;
  subtitle: string;
  caption: string;
  socialLink: SocialLinkStoryblok[];
  linksColumn: FooterLinkColumnStoryblok[];
  ctaButton: LinkStoryblok[];
  _uid: string;
  component: "footer";
  [k: string]: unknown;
}

export interface FooterLinkColumnStoryblok {
  title: string;
  links: LinkStoryblok[];
  _uid: string;
  component: "footerLinkColumn";
  [k: string]: unknown;
}

export interface HeaderStoryblok {
  links: LinkStoryblok[];
  _uid: string;
  component: "header";
  [k: string]: unknown;
}

export interface HeadingSectionStoryblok {
  title: string;
  content: string;
  _uid: string;
  component: "headingSection";
  [k: string]: unknown;
}

export interface HighlightSectionStoryblok {
  title: string;
  description: string;
  items: HighlightSectionItemStoryblok[];
  _uid: string;
  component: "highlightSection";
  [k: string]: unknown;
}

export interface HighlightSectionItemStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: "highlightSectionItem";
  [k: string]: unknown;
}

export interface HomeStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: "home";
  [k: string]: unknown;
}

export interface ImagesSectionStoryblok {
  start: AssetStoryblok;
  middle: AssetStoryblok;
  end: AssetStoryblok;
  _uid: string;
  component: "imagesSection";
  [k: string]: unknown;
}

export interface LinearSectionStoryblok {
  title: string;
  text: RichtextStoryblok;
  image: MultiassetStoryblok;
  _uid: string;
  component: "linearSection";
  [k: string]: unknown;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: unknown;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: unknown;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: unknown[];
        default_full_slug?: null | string;
        translated_slugs?: null | unknown[];
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: unknown;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: unknown;
    };

export interface LinkStoryblok {
  content: string;
  to: Exclude<MultilinkStoryblok, { linktype?: "asset" }>;
  _uid: string;
  component: "link";
  [k: string]: unknown;
}

export interface OverviewStoryblok {
  overviewRows: OverviewRowStoryblok[];
  _uid: string;
  component: "overview";
  [k: string]: unknown;
}

export interface OverviewRowStoryblok {
  background: "light" | "dark" | "contrast";
  block: (
    | ContactCompanyDetailsStoryblok
    | PageIntroStoryblok
    | ContactFaqStoryblok
    | ContactEmailFormStoryblok
    | BlogPostSliderStoryblok
    | BlogHeaderStoryblok
    | TypographyStoryblok
    | CtaSectionStoryblok
    | HighlightSectionStoryblok
    | HeadingSectionStoryblok
    | ImagesSectionStoryblok
    | StatisticsRowStoryblok
    | TimelineStoryblok
    | TypographyWithTableOfContentsStoryblok
    | LinearSectionStoryblok
    | SupportInfoStoryblok
    | PricingStoryblok
    | SellingPointsStoryblok
    | TestimonialStoryblok
  )[];
  _uid: string;
  component: "overviewRow";
  [k: string]: unknown;
}

export interface PageIntroStoryblok {
  title: string;
  description: string;
  _uid: string;
  component: "pageIntro";
  [k: string]: unknown;
}

export interface PickerFieldStoryblok {
  label: string;
  items: TextItemStoryblok[];
  _uid: string;
  component: "pickerField";
  [k: string]: unknown;
}

export interface PricingStoryblok {
  title: string;
  subtitle?: RichtextStoryblok;
  pricingCards: PricingCardStoryblok[];
  _uid: string;
  component: "pricing";
  [k: string]: unknown;
}

export interface PricingCardStoryblok {
  type: "basic" | "pro";
  title: string;
  tag?: string;
  description: string;
  priceFrequency?: string;
  cta: LinkStoryblok[];
  featuresTitle: string;
  features: PricingFeatureStoryblok[];
  _uid: string;
  component: "pricingCard";
  [k: string]: unknown;
}

export interface PricingFeatureStoryblok {
  title: string;
  type: "pro" | "con";
  _uid: string;
  component: "pricingFeature";
  [k: string]: unknown;
}

export interface SellingPointItemStoryblok {
  image: AssetStoryblok;
  title: string;
  description: string;
  _uid: string;
  component: "sellingPointItem";
  [k: string]: unknown;
}

export interface SellingPointsStoryblok {
  title: string;
  sellingPointItems: SellingPointItemStoryblok[];
  cta: LinkStoryblok[];
  _uid: string;
  component: "sellingPoints";
  [k: string]: unknown;
}

export interface SocialLinkStoryblok {
  platform: "linkedin" | "facebook" | "twitter";
  to: Exclude<
    MultilinkStoryblok,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  _uid: string;
  component: "socialLink";
  [k: string]: unknown;
}

export interface StatisticStoryblok {
  number: string;
  style: "decimal" | "percent";
  caption: string;
  _uid: string;
  component: "statistic";
  [k: string]: unknown;
}

export interface StatisticsRowStoryblok {
  statistics: StatisticStoryblok[];
  _uid: string;
  component: "statisticsRow";
  [k: string]: unknown;
}

export interface SupportCardStoryblok {
  image: AssetStoryblok;
  title: string;
  description: string;
  link: (LinkStoryblok | TelephoneLinkStoryblok)[];
  workingTime?: string;
  _uid: string;
  component: "supportCard";
  [k: string]: unknown;
}

export interface SupportInfoStoryblok {
  title: string;
  subtitle?: string;
  supportCards: SupportCardStoryblok[];
  _uid: string;
  component: "supportInfo";
  [k: string]: unknown;
}

export interface TelephoneLinkStoryblok {
  content: string;
  to: string;
  _uid: string;
  component: "telephoneLink";
  [k: string]: unknown;
}

export interface TestimonialStoryblok {
  title: string;
  testimonialCards: TestimonialCardStoryblok[];
  _uid: string;
  component: "testimonial";
  [k: string]: unknown;
}

export interface TestimonialCardStoryblok {
  testimonial: string;
  name: string;
  position: string;
  socialLinks?: SocialLinkStoryblok[];
  photo: AssetStoryblok;
  _uid: string;
  component: "testimonialCard";
  [k: string]: unknown;
}

export interface TextFieldStoryblok {
  label: string;
  placeholder: string;
  _uid: string;
  component: "textField";
  [k: string]: unknown;
}

export interface TextItemStoryblok {
  text: string;
  _uid: string;
  component: "textItem";
  [k: string]: unknown;
}

export interface TimelineStoryblok {
  heading: string;
  items: TimelineItemStoryblok[];
  _uid: string;
  component: "timeline";
  [k: string]: unknown;
}

export interface TimelineItemStoryblok {
  image: AssetStoryblok;
  title: string;
  caption: string;
  _uid: string;
  component: "timelineItem";
  [k: string]: unknown;
}

export interface TypographyStoryblok {
  content: RichtextStoryblok;
  _uid: string;
  component: "typography";
  [k: string]: unknown;
}

export interface TypographyWithTableOfContentsStoryblok {
  content: RichtextStoryblok;
  _uid: string;
  component: "typographyWithTableOfContents";
  [k: string]: unknown;
}
