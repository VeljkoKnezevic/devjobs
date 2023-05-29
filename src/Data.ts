export type Data = {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: Contract;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: Requirements;
  role: Requirements;
}[];

export type JobData = {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: Contract;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: Requirements;
  role: Requirements;
};

export enum Contract {
  Freelance = "Freelance",
  FullTime = "Full Time",
  PartTime = "Part Time",
}

export type Requirements = {
  content: string;
  items: string[];
};

export type FilterTypes = {
  search: string;
  fullTime: boolean;
  location: string;
};
