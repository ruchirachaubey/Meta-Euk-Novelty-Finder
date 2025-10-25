import { useMemo } from 'react'

interface SimilarityMatrixProps {
  species: Array<{
    name: string
    similarity: number
  }>
}

export default function SpeciesSimilarityMatrix({ species }: SimilarityMatrixProps) {
  const maxSimilarity = useMemo(() => {
    return Math.max(...species.map(s => s.similarity))
  }, [species])

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-medium text-gray-800 mb-3">Species Similarity Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Species</th>
              <th className="text-left py-2">Similarity</th>
              <th className="text-left py-2 w-full max-w-[200px]"></th>
            </tr>
          </thead>
          <tbody>
            {species.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{item.name}</td>
                <td className="py-3">{Math.round(item.similarity * 100)}%</td>
                <td className="py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{
                        width: `${(item.similarity / maxSimilarity) * 100}%`,
                        backgroundColor: item.similarity > 0.8 
                          ? '#10b981' 
                          : item.similarity > 0.6 
                            ? '#f59e0b' 
                            : '#ef4444'
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}