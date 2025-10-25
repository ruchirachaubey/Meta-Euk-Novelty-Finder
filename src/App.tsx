import { useState } from 'react'
import { Upload, Dna, Database, GitBranch, BarChart2, MapPin } from 'lucide-react'
import NovelSpeciesCard from './components/NovelSpeciesCard'
import PhylogeneticTree from './components/PhylogeneticTree'
import SpeciesSimilarityMatrix from './components/SpeciesSimilarityMatrix'
import MapVisualization from './components/MapVisualization'

function App() {
  const [dnaData, setDnaData] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('identification')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setDnaData(e.target?.result as string)
        analyzeDNA(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const analyzeDNA = (sequence: string) => {
    setIsAnalyzing(true)
    // Simulate ML model processing
    setTimeout(() => {
      setResults({
        knownSpecies: [
          {
            name: 'Bathypterois grallator',
            similarity: 0.87,
            sampleSize: 42,
            locations: [
              { lat: -32.5, lng: 152.5, depth: 1200 },
              { lat: -33.5, lng: 151.5, depth: 1500 }
            ]
          },
          {
            name: 'Chauliodus sloani',
            similarity: 0.76,
            sampleSize: 28,
            locations: [
              { lat: -32.7, lng: 152.7, depth: 800 },
              { lat: -33.2, lng: 151.8, depth: 950 }
            ]
          }
        ],
        novelSpecies: {
          confidence: 0.92,
          closestSpecies: [
            {
              name: 'Bathypterois grallator',
              similarity: 0.65,
              commonAncestor: 'Bathypterois'
            },
            {
              name: 'Bathypterois atricolor',
              similarity: 0.62,
              commonAncestor: 'Bathypterois'
            }
          ],
          sampleSize: 12,
          features: [
            { key: 'Unique gene sequence', value: 'COI-ATGCGT...' },
            { key: 'Morphological markers', value: 'Modified dorsal fin' },
            { key: 'Habitat depth', value: '1800-2200m' }
          ]
        },
        phylogeneticData: {
          name: 'Bathypterois',
          children: [
            {
              name: 'Bathypterois grallator',
              attributes: { type: 'known', similarity: '87%' }
            },
            {
              name: 'Bathypterois atricolor',
              attributes: { type: 'known', similarity: '62%' }
            },
            {
              name: 'Unknown Species X',
              attributes: { type: 'unknown' }
            }
          ]
        }
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Dna className="w-6 h-6" />
            Deep Sea Species ML Identifier
          </h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors">
              <Database className="w-4 h-4" />
              Reference Database
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Upload eDNA Sample</h2>
              <p className="text-gray-600 mb-4">
                Submit your environmental DNA sample for ML-powered species identification and analysis.
              </p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  Choose FASTA File
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".fasta,.txt" 
                    onChange={handleFileUpload}
                  />
                </label>
                {dnaData && (
                  <span className="text-sm text-gray-500">
                    {dnaData.length > 30 ? `${dnaData.substring(0, 30)}...` : dnaData}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-64 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">ML Analysis Status</h3>
              {isAnalyzing ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Processing with ML model...
                </div>
              ) : results ? (
                <div className="text-green-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Analysis Complete
                </div>
              ) : (
                <div className="text-gray-500">Awaiting sample</div>
              )}
            </div>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveTab('identification')}
                  className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'identification' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Dna className="inline mr-2 w-4 h-4" />
                  Species Identification
                </button>
                <button
                  onClick={() => setActiveTab('phylogeny')}
                  className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'phylogeny' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <GitBranch className="inline mr-2 w-4 h-4" />
                  Phylogenetic Analysis
                </button>
                <button
                  onClick={() => setActiveTab('distribution')}
                  className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'distribution' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <MapPin className="inline mr-2 w-4 h-4" />
                  Distribution
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'identification' && (
                <div className="space-y-6">
                  <NovelSpeciesCard data={results.novelSpecies} />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Identified Known Species</h3>
                    <SpeciesSimilarityMatrix species={results.knownSpecies} />
                  </div>
                </div>
              )}

              {activeTab === 'phylogeny' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Phylogenetic Relationships</h3>
                  <PhylogeneticTree 
                    data={results.phylogeneticData} 
                    novelSpeciesName="Unknown Species X" 
                  />
                </div>
              )}

              {activeTab === 'distribution' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Species Distribution Map</h3>
                  <MapVisualization species={results.knownSpecies} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App