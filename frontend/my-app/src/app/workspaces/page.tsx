'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/src/components/shared/ParticlesBackground';

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

  const dromMenuRef = useRef<HTMLDivElement | null>(null);
  
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


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {

      if (dromMenuRef.current && !dromMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }

    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])


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
            
            {/* Profile Button */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold hover:opacity-80 transition-all"
                style={{ backgroundColor: '#588157' }}
              >
                {user.avatar}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  {/* Overlay to close menu */}
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 40 }}
                    onClick={() => setIsProfileOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div 
                    className="absolute right-0 mt-2 w-64 backdrop-blur-xl rounded-xl shadow-2xl border overflow-hidden z-30"
                    style={{ 
                      backgroundColor: 'rgba(52, 78, 65, 0.95)',
                      borderColor: 'rgba(218, 215, 205, 0.2)',
                    }}
                    ref={dromMenuRef}
                  >
                    {/* User Info */}
                    <div className="p-4 border-b" style={{ borderColor: 'rgba(218, 215, 205, 0.1)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: '#588157' }}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{user.name}</p>
                          <p className="text-sm" style={{ color: '#DAD7CD' }}>{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push('/profile');
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <span className="text-xl">👤</span>
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push('/settings');
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <span className="text-xl">⚙️</span>
                        <span>Settings</span>
                      </button>

                      <div className="my-1 border-t" style={{ borderColor: 'rgba(218, 215, 205, 0.1)' }} />

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-red-500/20 transition-colors flex items-center gap-3"
                        style={{ color: '#ff6b6b' }}
                      >
                        <span className="text-xl">🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">My Workspaces</h2>
              <p style={{ color: '#DAD7CD' }}>
                Organize your teams and projects
              </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search workspaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(218, 215, 205, 0.1)',
                  }}
                />
              </div>

              {/* Create Button */}
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
                <div 
                  key={workspace.id}
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-white mb-2">No workspaces found</p>
                <p style={{ color: '#DAD7CD' }}>
                  Try a different search term or create a new workspace
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Workspace Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 50,
          backdropFilter: 'blur(8px)'
        }}>
          <div className="backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border" 
               style={{ 
                 backgroundColor: 'rgba(52, 78, 65, 0.95)',
                 borderColor: 'rgba(218, 215, 205, 0.3)'
               }}>
            <h2 className="text-3xl font-bold text-white mb-6">
              Create New Workspace
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Workspace Name *
                </label>
                <input
                  type="text"
                  required
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(218, 215, 205, 0.15)',
                  }}
                  placeholder="e.g., Project Tesla"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Description
                </label>
                <textarea
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm resize-none"
                  style={{ 
                    backgroundColor: 'rgba(218, 215, 205, 0.15)',
                  }}
                  rows={3}
                  placeholder="What is this workspace about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Access Password *
                </label>
                <input
                  type="password"
                  required
                  value={newWorkspace.password}
                  onChange={(e) => setNewWorkspace({...newWorkspace, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(218, 215, 205, 0.15)',
                  }}
                  placeholder="Set password for this workspace"
                  minLength={6}
                />
                <p className="text-xs mt-1" style={{ color: '#A3B18A' }}>
                  Members will need this password to join
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl hover:opacity-80 transition-all font-semibold text-white"
                style={{ backgroundColor: 'rgba(218, 215, 205, 0.2)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkspace}
                className="flex-1 px-4 py-3 rounded-xl hover:opacity-90 transition-all font-semibold text-white shadow-lg"
                style={{ backgroundColor: '#588157' }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}