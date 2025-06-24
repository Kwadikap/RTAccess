import React, { useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();

  const notifyBackend = async (token: string) => {
    await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  };

  const handleGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    await notifyBackend(token);
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    await notifyBackend(token);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleEmail} className="space-y-2 mb-4">
        <input
          className="border w-full p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <button onClick={handleGoogle} className="w-full bg-red-500 text-white p-2 rounded">
        Login with Google
      </button>
    </div>
  );
}
