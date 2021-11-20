export interface IData {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  release_date: string;
  characters: [string];
  planets: [string];
  starships: [string];
  vehicles: [string];
  species: [string];
}

export interface IDatas {
  count: number;
  results: [IData];
}
