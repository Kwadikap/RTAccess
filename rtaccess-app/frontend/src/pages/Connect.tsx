import React, { useEffect, useState } from 'react';

interface UserCard {
  id: string;
  name: string;
  avatar?: string;
}

export default function Connect() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserCard[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3000/api/connect?q=${query}`);
      const data = await res.json();
      setResults(data.connections || []);
    };
    fetchUsers();
  }, [query]);

  const handleConnect = async (id: string) => {
    await fetch('http://localhost:3000/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Find People</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {results.map((u) => (
          <div key={u.id} className="border p-2 rounded text-center">
            <img src={u.avatar || 'https://placehold.co/64'} className="mx-auto rounded-full mb-2" />
            <p className="font-semibold">{u.name}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleConnect(u.id)}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
