import { PokemonMinimal } from "../types";
import Image from "next/image";

export default function PokemonCard({ pokemon }: { pokemon: PokemonMinimal }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-32 h-32">
        <Image 
          src={pokemon.image} 
          alt={pokemon.name} 
          fill 
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-2 text-lg font-bold capitalize text-gray-800">
        {pokemon.name}
      </h3>
      <span className="text-xs text-gray-500">#{pokemon.id}</span>
    </div>
  );
}