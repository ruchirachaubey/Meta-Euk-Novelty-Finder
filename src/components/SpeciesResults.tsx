import { Dna, CircleDot, AlertCircle } from 'lucide-react'

interface Species {
  name: string
  probability: number
  locations: Array<{
    lat: number
    lng: number
    depth: number
  }>
  populationTrend: number[]
}

interface SpeciesResultsProps {
  species: Species[]
}

export default function SpeciesResults({ species }: SpeciesResultsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Identified Species</h2>
      <div className="space-y-6">
        {species.map((specimen, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-ocean-800 flex items-center gap-2">
                <Dna className="w-5 h-5 text-ocean-600" />
                {specimen.name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                specimen.probability > 0.9 
                  ? 'bg-green-100 text-green-800' 
                  : specimen.probability > 0.7 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
              }`}>
                {Math.round(specimen.probability * 100)}% match
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Sample Locations</h4>
                <ul className="space-y-2">
                  {specimen.locations.map((loc, locIndex) => (
                    <li key={locIndex} className="flex items-center gap-2 text-sm">
                      <CircleDot className="w-4 h-4 text-ocean-500" />
                      {loc.lat.toFixed(2)}°S, {loc.lng.toFixed(2)}°E
                      <span className="text-gray-500 ml-2">({loc.depth}m depth)</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Conservation Status</h4>
                <div className="flex items-center gap-2 text-sm">
                  {specimen.populationTrend[0] > specimen.populationTrend[specimen.populationTrend.length - 1] ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>Population decreasing</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-green-500" />
                      <span>Population stable/increasing</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Last sampled {specimen.populationTrend.length} times with {specimen.populationTrend[0]} to {specimen.populationTrend[specimen.populationTrend.length - 1]} individuals.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}