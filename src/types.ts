export type PaginationParams = {
    count: number;
    pages: number;
    next: string;
    prev: null | string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type FilterParams = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}
