import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Species {
  name: string
  populationTrend: number[]
}

interface PopulationChartProps {
  species: Species[]
}

export default function PopulationChart({ species }: PopulationChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Population Trends Over Time',
      },
    },
  }

  const labels = species[0].populationTrend.map((_, index) => `Sample ${index + 1}`)

  const data = {
    labels,
    datasets: species.map((specimen, index) => ({
      label: specimen.name,
      data: specimen.populationTrend,
      backgroundColor: index === 0 ? 'rgba(14, 165, 233, 0.7)' : 'rgba(234, 88, 12, 0.7)',
    })),
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Population Trends</h2>
      <div className="h-[400px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}