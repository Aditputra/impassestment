'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

export default function PostDetail() {
  const [post, setPost] = useState<any>(null);
  const params = useParams();

  useEffect(() => {
    api.get(`/posts/${params.id}`).then(res => setPost(res.data));
  }, [params.id]);

  if (!post) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.body}</p>
      <a href="/posts" className="btn btn-secondary mt-4">Back</a>
    </div>
  );
}