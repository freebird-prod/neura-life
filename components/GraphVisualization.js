"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      Loading graph...
    </div>
  ),
});

const GraphVisualization = ({ graphData, onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Transform data for force graph
  const graphDataFormatted = useMemo(() => {
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    if (!graphData || graphData.length === 0) {
      return { nodes: [], links: [] };
    }

    // Create nodes
    graphData.forEach((node, index) => {
      const graphNode = {
        id: node.id,
        name: node.title,
        content: node.content,
        connections: node.connections || [],
        createdAt: node.createdAt,
        val: Math.max(5, Math.min(20, (node.content?.length || 0) / 50 + 5)), // Size based on content length
      };
      nodes.push(graphNode);
      nodeMap.set(node.id, graphNode);
    });

    // Create links based on connections
    graphData.forEach((node) => {
      if (node.connections && Array.isArray(node.connections)) {
        node.connections.forEach((connection) => {
          // Find nodes that have this connection in their title or are connected to it
          const connectedNodes = graphData.filter(
            (otherNode) =>
              otherNode.id !== node.id &&
              (otherNode.title
                .toLowerCase()
                .includes(connection.toLowerCase()) ||
                otherNode.connections?.some((conn) =>
                  conn.toLowerCase().includes(connection.toLowerCase())
                ))
          );

          connectedNodes.forEach((connectedNode) => {
            // Avoid duplicate links
            const linkExists = links.some(
              (link) =>
                (link.source === node.id && link.target === connectedNode.id) ||
                (link.source === connectedNode.id && link.target === node.id)
            );

            if (!linkExists) {
              links.push({
                source: node.id,
                target: connectedNode.id,
                value: 1,
              });
            }
          });
        });
      }
    });

    return { nodes, links };
  }, [graphData]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  if (!graphData || graphData.length === 0) {
    return (
      <div className="relative w-full h-96 bg-white rounded-xl shadow-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium mb-2">No nodes to display</p>
          <p className="text-sm">Create some nodes to see your memory graph</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-white rounded-xl shadow-lg overflow-hidden">
      <ForceGraph2D
        graphData={graphDataFormatted}
        nodeLabel={(node) =>
          `${node.name}\n${node.content?.substring(0, 100)}${
            node.content?.length > 100 ? "..." : ""
          }`
        }
        nodeColor={() => "#ec4899"} // pink-600
        nodeRelSize={6}
        linkColor={() => "#f472b6"} // pink-400
        linkWidth={2}
        onNodeClick={handleNodeClick}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        enableNodeDrag={true}
        enableZoomPan={true}
      />

      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{selectedNode.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{selectedNode.content}</p>
          {selectedNode.createdAt && (
            <div className="text-xs text-gray-500">
              Created:{" "}
              {selectedNode.createdAt?.seconds
                ? new Date(
                    selectedNode.createdAt.seconds * 1000
                  ).toLocaleDateString()
                : new Date(selectedNode.createdAt).toLocaleDateString()}
            </div>
          )}
          {selectedNode.connections?.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-medium text-gray-700 mb-1">
                Connections:
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.connections.map((conn, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                  >
                    {conn}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;
