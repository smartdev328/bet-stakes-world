export type PackageType = {
  title: string | undefined;
  price: number | undefined;
  id?: string;
};

export type MembershipType = {
  vipAllAccessCard: PackageType | undefined;
  sportsCard: PackageType | undefined;
  fantasy: PackageType | undefined;
};
