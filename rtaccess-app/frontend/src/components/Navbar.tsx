import React, { ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebase';

interface NavbarProps {
  notificationIcon?: ReactNode;
}

interface Notification {
  id: string;
  read: boolean;
}

export default function Navbar({ notificationIcon }: NavbarProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('http://localhost:3000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const unread = (data.notifications || []).filter((n: Notification) => !n.read).length;
      setCount(unread);
    };
    fetchNotifications();
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow p-4">
      <h1 className="text-xl font-semibold">RTAccess</h1>
      <div className="relative text-2xl" aria-label="notifications">
        {notificationIcon}
        {count > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </header>
  );
}
