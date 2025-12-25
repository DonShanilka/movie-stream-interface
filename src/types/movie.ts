export interface Movie {
  Id: number;
  Title: string;
  Description: string;
  Genre: string;
  Language: string;
  Country: string;
  ReleaseYear: number;
  Duration: number;
  AgeRating: string;
  Rating: string;
  MovieURL: string;
  Banner: string;     // base64
  Thumbnail: string;  // base64
}