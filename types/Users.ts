import { BillingPlan } from './Packages';
import { Sport } from './Sports';

export type CreateUserType = {
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  full_name: string | undefined;
  email: string | undefined;
  mobile_number: string | undefined;
  password: string | undefined;
  verify_password: string | undefined;
  provider: string | undefined;
};

export type CreateUserValidateType = {
  username: boolean;
  first_name: boolean;
  last_name: boolean;
  email: boolean;
  password: boolean;
  verify_password: boolean;
};

export type LoginUserType = {
  email: string | undefined;
  password: string | undefined;
};

export type LoginUserValidateType = {
  email: boolean;
  password: boolean;
};

export type UserProfile = {
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  mobile_number: string | undefined;
  provider: string | undefined;
};

export type ProfileValidateType = {
  username: boolean;
  first_name: boolean;
  last_name: boolean;
  email: boolean;
  password: boolean;
  verify_password: boolean;
};

export type UserCreditCard = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
};

export type UserBillingInfo = {
  full_name: string | undefined;
  address: string | undefined;
  zipcode: string | undefined;
  country: string | undefined;
  city: string | undefined;
};

export type NotificationConfig = {
  sportsCardOrVipAccessPicksEmail: boolean;
  sportsCardOrVipAccessPicksMsg: boolean;
  fantasyLineupEmail: boolean;
  fantasyLineupMsg: boolean;
  expiringMembershipEmail: boolean;
  expiringMembershipMsg: boolean;
  promotionalNotificationEmail: boolean;
  promotionalNotificationMsg: boolean;
  blogPostNotificationEmail: boolean;
  blogPostNotificationMsg: boolean;
};

export type UserSubscription = {
  id: string;
  pay_subscription_id: string;
  valid_from: Date;
  valid_till: Date;
  is_active: boolean;
  owner: UserProfile;
  plan: BillingPlan;
  sports: Sport[];
};

export type AddUserSubscription = {
  plan_id: string;
  sports: number[];
};

export type ForgotPasswordForm = {
  email: string | undefined;
};

export type ForgotPasswordFormValidate = {
  email: boolean;
};

export type AddUserPayment = {
  payment_method_id: string;
};
