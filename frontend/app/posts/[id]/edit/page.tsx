// nextjs/app/posts/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    api.get(`/posts/${params.id}`).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
      setLoading(false);
    });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/posts/${params.id}`, { title, body });
    router.push('/posts');
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input type="text" className="input input-bordered w-full" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="label">Content</label>
            <textarea className="textarea textarea-bordered w-full h-40" value={body} onChange={e => setBody(e.target.value)} required />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-warning">Update Post</button>
            <Link href="/posts" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}