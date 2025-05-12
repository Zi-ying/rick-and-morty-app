export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export type LocationFilters = {
  name: string;
  dimension: string;
  type: string;
}
