'use client';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  newWorkspace: {
    name: string;
    description: string;
    password: string;
  };
  setNewWorkspace: (workspace: any) => void;
  onSubmit: () => void;
}

export default function CreateWorkspaceModal({ 
  isOpen, 
  onClose, 
  newWorkspace, 
  setNewWorkspace, 
  onSubmit 
}: CreateWorkspaceModalProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl hover:opacity-80 transition-all font-semibold text-white"
            style={{ backgroundColor: 'rgba(218, 215, 205, 0.2)' }}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-3 rounded-xl hover:opacity-90 transition-all font-semibold text-white shadow-lg"
            style={{ backgroundColor: '#588157' }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}