import { Tree } from 'react-d3-tree'
import { useRef, useEffect, useState } from 'react'

interface TreeNode {
  name: string
  attributes?: {
    type?: 'known' | 'unknown'
    similarity?: string
  }
  children?: TreeNode[]
}

interface PhylogeneticTreeProps {
  data: TreeNode
  novelSpeciesName: string
}

export default function PhylogeneticTree({ data, novelSpeciesName }: PhylogeneticTreeProps) {
  const treeContainerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.clientWidth,
        height: treeContainerRef.current.clientHeight
      })
    }
  }, [])

  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isNovel = nodeDatum.name === novelSpeciesName
    const isKnown = nodeDatum.attributes?.type === 'known'
    
    return (
      <g>
        <circle
          r={15}
          fill={isNovel ? '#f59e0b' : isKnown ? '#3b82f6' : '#94a3b8'}
          stroke="#fff"
          strokeWidth={2}
          onClick={toggleNode}
        />
        <text
          x={20}
          y={5}
          fill={isNovel ? '#92400e' : isKnown ? '#1e40af' : '#334155'}
          fontSize={12}
          fontWeight={isNovel ? 'bold' : 'normal'}
        >
          {nodeDatum.name}
        </text>
        {nodeDatum.attributes?.similarity && (
          <text x={20} y={25} fill="#64748b" fontSize={10}>
            {nodeDatum.attributes.similarity} similar
          </text>
        )}
      </g>
    )
  }

  return (
    <div className="h-[400px] border rounded-lg bg-white" ref={treeContainerRef}>
      <Tree
        data={data}
        renderCustomNodeElement={renderCustomNode}
        orientation="vertical"
        translate={{
          x: dimensions.width / 2,
          y: dimensions.height / 4
        }}
        pathFunc="step"
        collapsible={false}
        zoomable={true}
        nodeSize={{ x: 200, y: 100 }}
      />
    </div>
  )
}