export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  phone: {
    label: string;
    value: string;
  };
  email: {
    label: string;
    value: string;
  };
  social: SocialLink[];
}
