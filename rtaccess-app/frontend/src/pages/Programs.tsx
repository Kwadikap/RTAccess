import React, { useState } from 'react';

interface Program {
  title: string;
  description: string;
}

export default function Programs() {
  const [input, setInput] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/generate-program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: input }),
      });
      const data = await res.json();
      setPrograms((prev) => [{ title: data.title, description: data.description }, ...prev]);
      setInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Generate Programs</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Population or goal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? '...' : 'Generate'}
        </button>
      </form>
      <div className="space-y-4">
        {programs.map((p, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
