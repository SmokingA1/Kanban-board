'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

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
          Create Account
        </h1>
        <p style={{ color: '#DAD7CD' }}>
          Fill in the details to register
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#DAD7CD' }}>
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl text-white backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-green-500/50"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
              borderColor: 'rgba(218, 215, 205, 0.2)',
            }}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#DAD7CD' }}>
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl text-white backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-green-500/50"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
              borderColor: 'rgba(218, 215, 205, 0.2)',
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
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-3 rounded-xl text-white backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-green-500/50"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
              borderColor: 'rgba(218, 215, 205, 0.2)',
            }}
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#DAD7CD' }}>
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="w-full px-4 py-3 rounded-xl text-white backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-green-500/50"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
              borderColor: 'rgba(218, 215, 205, 0.2)',
            }}
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold transition-all shadow-lg mt-6 text-white hover:opacity-90"
          style={{ backgroundColor: '#3A5A40' }}
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: '#DAD7CD' }}>
          Already have an account?{' '}
          <Link href="/auth/login" className="text-white font-semibold hover:underline">
            Login
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