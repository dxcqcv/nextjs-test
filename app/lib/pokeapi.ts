import { 
    FetchResult, 
    PokemonMinimal, 
    PokeAPIPokemonListResponse, 
    PokeAPITypeResponse,
    PokeAPITypeListResponse 
  } from '../types';
  
  const BASE_URL = 'https://pokeapi.co/api/v2';
  const ITEMS_PER_PAGE = 20;
  
  // Helper to extract ID from URL to generate image URL
  const getPokemonIdFromUrl = (url: string): number => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1]);
  };
  
  // Helper to format minimal pokemon data
  const formatPokemon = (name: string, url: string): PokemonMinimal => {
    const id = getPokemonIdFromUrl(url);
    return {
      name,
      url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    };
  };
  
  export async function getTypes(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/type`);
    if (!res.ok) throw new Error('Failed to fetch types');
    const data: PokeAPITypeListResponse = await res.json();
    return data.results.map((t) => t.name);
  }
  
  export async function getPokemonData(
    page: number, 
    typeFilter?: string
  ): Promise<FetchResult> {
    const offset = (page - 1) * ITEMS_PER_PAGE;
  

    if (typeFilter && typeFilter !== 'all') {
      const res = await fetch(`${BASE_URL}/type/${typeFilter}`);
      if (!res.ok) {
          // If type not found, return empty
          return { data: [], totalCount: 0, totalPages: 0, currentPage: page };
      }
      
      const data: PokeAPITypeResponse = await res.json();
      const allPokemon = data.pokemon.map(p => p.pokemon);
      
      // Server-side Pagination Logic
      const paginatedItems = allPokemon.slice(offset, offset + ITEMS_PER_PAGE);
      
      return {
        data: paginatedItems.map(p => formatPokemon(p.name, p.url)),
        totalCount: allPokemon.length,
        totalPages: Math.ceil(allPokemon.length / ITEMS_PER_PAGE),
        currentPage: page,
      };
    }
  

    const res = await fetch(
      `${BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
    );
    if (!res.ok) throw new Error('Failed to fetch pokemon');
    
    const data: PokeAPIPokemonListResponse = await res.json();
    
    return {
      data: data.results.map(p => formatPokemon(p.name, p.url)),
      totalCount: data.count,
      totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
      currentPage: page,
    };
  }