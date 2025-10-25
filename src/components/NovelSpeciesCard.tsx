import { AlertTriangle, Dna, Database, BarChart2 } from 'lucide-react'

interface NovelSpeciesProps {
  data: {
    confidence: number
    closestSpecies: {
      name: string
      similarity: number
      commonAncestor: string
    }[]
    sampleSize: number
    features: {
      key: string
      value: string
    }[]
  }
}

export default function NovelSpeciesCard({ data }: NovelSpeciesProps) {
  return (
    <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg text-yellow-800">Potential Novel Species Detected</h3>
          <p className="text-yellow-700">
            Confidence: <span className="font-medium">{Math.round(data.confidence * 100)}%</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Closest Known Species
          </h4>
          <ul className="space-y-3">
            {data.closestSpecies.map((species, index) => (
              <li key={index} className="bg-white p-3 rounded border">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{species.name}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {Math.round(species.similarity * 100)}% similar
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Common ancestor: {species.commonAncestor}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Sample Statistics
            </h4>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm">
                <span className="font-medium">Sample size:</span> {data.sampleSize} sequences
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-yellow-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, data.sampleSize / 50 * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Dna className="w-4 h-4" />
              Distinctive Features
            </h4>
            <ul className="space-y-2">
              {data.features.map((feature, index) => (
                <li key={index} className="bg-white p-2 rounded border text-sm">
                  <span className="font-medium">{feature.key}:</span> {feature.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}