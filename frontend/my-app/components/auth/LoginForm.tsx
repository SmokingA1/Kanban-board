'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Временно: просто редирект на воркспейсы
    router.push('/workspaces');
  };

  return (
    <div className="backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border" 
         style={{ 
           backgroundColor: 'rgba(218, 215, 205, 0.1)',
           borderColor: 'rgba(218, 215, 205, 0.2)'
         }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Login
        </h1>
        <p style={{ color: '#DAD7CD' }}>
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#DAD7CD' }}>
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-green-500 focus:ring-green-500/50 backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
            }}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#DAD7CD' }}>
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(218, 215, 205, 0.1)"
            }}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold transition-all shadow-lg mt-6 text-white hover:opacity-90"
          style={{ backgroundColor: '#588157' }}
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: '#DAD7CD' }}>
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-white font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <Link 
        href="/"
        className="block mt-6 text-center text-sm transition-colors hover:text-white"
        style={{ color: '#A3B18A' }}
      >
        ← Back to home
      </Link>
    </div>
  );
}