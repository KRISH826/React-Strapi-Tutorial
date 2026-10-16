import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_homepage_about_uses';
  info: {
    displayName: 'about-us';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
        minLength: 5;
      }>;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HomepageBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_banner_sections';
  info: {
    displayName: 'banner-section';
    icon: 'folder';
  };
  attributes: {};
}

export interface HomepagePricingSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_pricing_sections';
  info: {
    displayName: 'pricing-section';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'homepage.about-us': HomepageAboutUs;
      'homepage.banner-section': HomepageBannerSection;
      'homepage.pricing-section': HomepagePricingSection;
    }
  }
}
