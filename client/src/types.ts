export type JobData = {
  id: number;
  company: string;
  logo: string;
  position: string;
  postedAt: string;
  contract: Contract;
  location: string;
  apply: string;
  description: string;
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
