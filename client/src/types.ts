export type JobData = {
  id: number;
  company: string;
  logo: string;
  position: string;
  postedAt: string;
  contract: Contract;
  location: string;
  applyLink: string;
  description: string;
};

export enum Contract {
  Freelance = "Freelance",
  FullTime = "Full-time",
  PartTime = "Part-time",
}

export type FilterTypes = {
  search: string;
  fullTime: boolean;
  location: string;
};
