// nextjs/app/posts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Posts() {
  const [posts, setPosts] = useState<any>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Delete this post?')) {
      await api.delete(`/posts/${id}`);
      setPosts((prev: any) => ({
        ...prev,
        data: prev.data.filter((p: any) => p.id !== id)
      }));
    }
  };

  if (!posts) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <div className="flex gap-2">
          <Link href="/posts/create" className="btn btn-primary">New Post</Link>
          <button onClick={logout} className="btn btn-error">Logout</button>
        </div>
      </div>

      <div className="grid gap-4">
        {posts.data.map((post: any) => (
          <div key={post.id} className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <h2 className="card-title">
                <Link href={`/posts/${post.id}`} className="link link-hover">{post.title}</Link>
              </h2>
              <p className="text-sm text-gray-600">By {post.user?.name}</p>
              <div className="card-actions justify-end mt-2">
                <Link href={`/posts/${post.id}`} className="btn btn-sm btn-info">View</Link>
                {user?.id === post.user_id && (
                  <>
                    <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-warning">Edit</Link>
                    <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-error">Delete</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-group mt-6 justify-center">
        {posts.prev_page_url && <Link href={`?page=${posts.current_page - 1}`} className="btn">Prev</Link>}
        <button className="btn btn-active">Page {posts.current_page}</button>
        {posts.next_page_url && <Link href={`?page=${posts.current_page + 1}`} className="btn">Next</Link>}
      </div>
    </div>
  );
}