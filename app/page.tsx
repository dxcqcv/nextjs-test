import { getPokemonData, getTypes } from './lib/pokeapi';
import FilterControls from './components/FilterControls';
import PokemonCard from './components/PokemonCard';
import { Suspense } from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  
  // Parse params
  const page = Number(searchParams.page) || 1;
  const typeFilter = typeof searchParams.type === 'string' ? searchParams.type : 'all';

  // Parallel Data Fetching
  const [types, { data: pokemons, totalPages, totalCount }] = await Promise.all([
    getTypes(),
    getPokemonData(page, typeFilter),
  ]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
        Welcome to Pokemon world
      </h1>


      {/* Controls (Client Component) */}
      <FilterControls 
        types={types} 
        totalPages={totalPages} 
        currentPage={page} 
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing <strong>{pokemons.length}</strong> results of <strong>{totalCount}</strong>
      </div>

      {/* Grid Grid */}
      <Suspense fallback={<div className="text-center p-10">Loading Pokémon...</div>}>
        {pokemons.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 text-gray-500 border-2 border-dashed rounded-lg">
            No Pokémon found for this filter.
          </div>
        )}
      </Suspense>
    </main>
  );
}