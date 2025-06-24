import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('http://localhost:3000/api/feed', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data.items || []);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Feed</h2>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
