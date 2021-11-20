export interface IFilm {
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

export interface IFilms {
  count: number;
  results: [IFilm];
}

export interface ICharacters {
  count: number;
  previous: string;
  next: string;
  results: ICharacter[];
}

export interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: [string];
  species: [string];
  vehicles: [string];
  starships: [string];
}
