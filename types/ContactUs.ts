export type ContactUsForm = {
  email: string | undefined;
  subject: string | undefined;
  description: string | undefined;
};

export type ContactUsFormValidation = {
  email: boolean;
  subject: boolean;
  description: boolean;
};
