'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/shared/ParticlesBackground';
import WorkspaceCard from '@/components/workspace/WorkspaceCard';
import CreateWorkspaceModal from '@/components/workspace/CreateWorkspaceModal';
import ProfileSidebar from '@/components/workspace/ProfileSidebar';

export default function WorkspacesPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    password: ''
  });

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD'
  };

  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Project Tesla',
      description: 'Electric vehicle development',
      boardsCount: 3,
      membersCount: 12,
      createdAt: '2025-01-15',
      color: '#588157'
    },
    {
      id: 2,
      name: 'Construction Site Alpha',
      description: 'Building management and coordination',
      boardsCount: 5,
      membersCount: 8,
      createdAt: '2025-01-10',
      color: '#3A5A40'
    }
  ]);

  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateWorkspace = async () => {
    if (!newWorkspace.name.trim()) {
      alert('Please enter workspace name');
      return;
    }

    const workspace = {
      id: Date.now(),
      name: newWorkspace.name,
      description: newWorkspace.description,
      boardsCount: 0,
      membersCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      color: '#588157'
    };

    setWorkspaces([...workspaces, workspace]);
    setNewWorkspace({ name: '', description: '', password: '' });
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    router.push('/auth/login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground 
        color="rgba(163,184,138,0.9)"
        gradient="linear-gradient(to bottom right, #344E41, #3A5A40, #588157)"
      />
      
      <div className="relative min-h-screen" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="border-b" style={{ 
          backgroundColor: 'rgba(52, 78, 65, 0.5)',
          borderColor: 'rgba(218, 215, 205, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Kanban Board</h1>
            
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-80 transition-all"
              style={{ backgroundColor: '#588157' }}
            >
              {user.avatar}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">My Workspaces</h2>
              <p style={{ color: '#DAD7CD' }}>Organize your teams and projects</p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search workspaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(218, 215, 205, 0.1)' }}
                />
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
                style={{ backgroundColor: '#588157' }}
              >
                <span className="text-xl">+</span> Create
              </button>
            </div>
          </div>

          {/* Workspaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.length > 0 ? (
              filteredWorkspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-white mb-2">No workspaces found</p>
                <p style={{ color: '#DAD7CD' }}>
                  Try a different search term or create new workspace
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateWorkspaceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newWorkspace={newWorkspace}
        setNewWorkspace={setNewWorkspace}
        onSubmit={handleCreateWorkspace}
      />

      <ProfileSidebar 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        workspacesCount={workspaces.length}
        totalBoards={workspaces.reduce((sum, ws) => sum + ws.boardsCount, 0)}
        onLogout={handleLogout}
      />
    </div>
  );
}