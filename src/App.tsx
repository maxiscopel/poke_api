import { useEffect, useState } from 'react'
import type { PokemonListItem, PokemonListResponse } from './types/pokemon'
import PokemonList from './components/PokemonList'

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data: PokemonListResponse = await res.json()
        setPokemons(data.results)
      } catch (err) {
        setError('No se pudieron cargar los Pokémon. Intentá de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Cargando Pokémon...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        Pokédex
      </h1>
      <PokemonList
        pokemons={pokemons}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}

export default App