'use client';

import { useRouter } from 'next/navigation';

interface WorkspaceCardProps {
  workspace: {
    id: number;
    name: string;
    description: string;
    boardsCount: number;
    membersCount: number;
    createdAt: string;
    color: string;
  };
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/workspaces/${workspace.id}`)}
      className="backdrop-blur-xl rounded-2xl shadow-xl p-6 border hover:scale-105 transition-transform cursor-pointer"
      style={{ 
        backgroundColor: 'rgba(218, 215, 205, 0.1)',
        borderColor: 'rgba(218, 215, 205, 0.2)'
      }}
    >
      <div 
        className="w-full h-2 rounded-full mb-4"
        style={{ backgroundColor: workspace.color }}
      />
      
      <h3 className="text-2xl font-bold text-white mb-2">
        {workspace.name}
      </h3>
      <p className="text-sm mb-4 line-clamp-2" style={{ color: '#DAD7CD' }}>
        {workspace.description || 'No description'}
      </p>

      <div className="flex gap-4 text-sm mb-3">
        <div className="flex items-center gap-1">
          <span className="text-lg">📋</span>
          <span className="text-white font-medium">{workspace.boardsCount}</span>
          <span style={{ color: '#DAD7CD' }}>boards</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg">👥</span>
          <span className="text-white font-medium">{workspace.membersCount}</span>
          <span style={{ color: '#DAD7CD' }}>members</span>
        </div>
      </div>

      <div className="text-xs" style={{ color: '#A3B18A' }}>
        Created: {workspace.createdAt}
      </div>
    </div>
  );
}