export interface PokemonMinimal {
    name: string;
    url: string;
    id: number;
    image: string;
  }
  
  export interface PokemonType {
    name: string;
    url: string;
  }
  
  export interface FetchResult {
    data: PokemonMinimal[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }
  
  // Raw API response types for internal use
  export interface PokeAPIPokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }
  
  export interface PokeAPITypeResponse {
    pokemon: { pokemon: { name: string; url: string } }[];
  }
  
  export interface PokeAPITypeListResponse {
    results: { name: string; url: string }[];
  }