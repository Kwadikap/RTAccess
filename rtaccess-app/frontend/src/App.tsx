import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Programs from './pages/Programs';
import Messages from './pages/Messages';
import Connect from './pages/Connect';
import Login from './pages/Login';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar notificationIcon={<span>🔔</span>} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
