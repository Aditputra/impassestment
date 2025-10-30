'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Name</label>
              <input type="text" className="input input-bordered" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-control mt-2">
              <label className="label">Email</label>
              <input type="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-control mt-2">
              <label className="label">Password</label>
              <input type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Register</button>
            </div>
          </form>
          <Link href="/login" className="link text-center mt-4">Already have account? Login</Link>
        </div>
      </div>
    </div>
  );
}