'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/posts', { title, body });
    router.push('/posts');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">Title</label>
          <input type="text" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-control mb-4">
          <label className="label">Body</label>
          <textarea className="textarea textarea-bordered" value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}