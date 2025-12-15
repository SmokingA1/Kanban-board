'use client';

import { useRouter } from 'next/navigation';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  workspacesCount: number;
  totalBoards: number;
  onLogout: () => void;
}

export default function ProfileSidebar({ 
  isOpen, 
  onClose, 
  user, 
  workspacesCount, 
  totalBoards,
  onLogout 
}: ProfileSidebarProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ zIndex: 60 }}
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div 
        className="fixed top-0 right-0 h-full w-80 backdrop-blur-xl shadow-2xl border-l transition-transform"
        style={{ 
          backgroundColor: 'rgba(52, 78, 65, 0.98)',
          borderColor: 'rgba(218, 215, 205, 0.2)',
          zIndex: 70,
          animation: 'slideIn 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(218, 215, 205, 0.1)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">Profile</h3>
            <button
              onClick={onClose}
              className="text-white hover:opacity-70 transition-opacity text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
              style={{ backgroundColor: '#588157' }}
            >
              {user.avatar}
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{user.name}</p>
              <p className="text-sm" style={{ color: '#DAD7CD' }}>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <button
            onClick={() => {
              onClose();
              router.push('/profile');
            }}
            className="w-full px-4 py-4 rounded-lg text-left text-white hover:bg-white/10 transition-colors flex items-center gap-4 mb-2"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(218, 215, 205, 0.1)' }}>
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <p className="font-semibold">My Profile</p>
              <p className="text-xs" style={{ color: '#DAD7CD' }}>View and edit your profile</p>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              router.push('/settings');
            }}
            className="w-full px-4 py-4 rounded-lg text-left text-white hover:bg-white/10 transition-colors flex items-center gap-4 mb-2"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(218, 215, 205, 0.1)' }}>
              <span className="text-2xl">⚙️</span>
            </div>
            <div>
              <p className="font-semibold">Settings</p>
              <p className="text-xs" style={{ color: '#DAD7CD' }}>Manage your preferences</p>
            </div>
          </button>

          <div className="my-4 border-t" style={{ borderColor: 'rgba(218, 215, 205, 0.1)' }} />

          <button
            onClick={onLogout}
            className="w-full px-4 py-4 rounded-lg text-left hover:bg-red-500/20 transition-colors flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
              <span className="text-2xl">🚪</span>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#ff6b6b' }}>Logout</p>
              <p className="text-xs" style={{ color: '#DAD7CD' }}>Sign out of your account</p>
            </div>
          </button>
        </div>

        {/* Footer Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: 'rgba(218, 215, 205, 0.1)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{workspacesCount}</p>
              <p className="text-xs" style={{ color: '#DAD7CD' }}>Workspaces</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalBoards}</p>
              <p className="text-xs" style={{ color: '#DAD7CD' }}>Total Boards</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}