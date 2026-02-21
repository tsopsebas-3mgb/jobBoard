export interface Location {
  city: string;
  region: string;
  neighborhood: string;
}

export interface Salary {
  min: number;
  max: number;
  negotiable: boolean;
}

export interface Job {
  id: number;
  title: string;
  employer: string;
  description: string;
  contractType: string;
  domain: string;
  location: Location;
  salary: Salary;
  publishDate: any;
  status: string;
}
