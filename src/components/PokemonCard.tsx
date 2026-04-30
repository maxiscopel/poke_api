import { useEffect, useState } from 'react'
import type { PokemonDetail } from '../types/pokemon'

interface PokemonCardProps {
  name: string
  isSelected: boolean
  onSelect: (name: string) => void
}

function PokemonCard({ name, isSelected, onSelect }: PokemonCardProps) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data: PokemonDetail = await res.json()
        setDetail(data)
      } catch (err) {
        console.error(`Error cargando ${name}`, err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [name])

  if (loading) {
    return (
      <div className="bg-gray-200 animate-pulse rounded-xl h-48" />
    )
  }

  if (!detail) return null

  return (
    <div
      onClick={() => onSelect(name)}
      className={`
        bg-white rounded-xl p-4 cursor-pointer shadow
        transition-all duration-200 hover:scale-105
        ${isSelected ? 'ring-4 ring-red-500 scale-105' : ''}
      `}
    >
      {/* Imagen */}
      {detail.sprites.front_default && (
        <img
          src={detail.sprites.front_default}
          alt={name}
          className="w-24 h-24 mx-auto"
        />
      )}

      {/* Nombre */}
      <p className="text-center font-bold capitalize text-gray-800 mt-1">
        {name}
      </p>

      {/* Tipos */}
      <div className="flex justify-center gap-1 mt-2 flex-wrap">
        {detail.types.map((t) => (
          <span
            key={t.type.name}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Stats — solo si está seleccionado */}
      {isSelected && (
        <div className="mt-3 border-t pt-3">
          {detail.stats.map((s) => (
            <div key={s.stat.name} className="flex justify-between text-xs text-gray-600 capitalize">
              <span>{s.stat.name}</span>
              <span className="font-bold">{s.base_stat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonCard