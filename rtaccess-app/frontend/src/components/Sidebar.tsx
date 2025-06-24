import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { to: '/', label: 'Feed' },
    { to: '/programs', label: 'Programs' },
    { to: '/messages', label: 'Messages' },
    { to: '/connect', label: 'Connect' },
  ];

  return (
    <nav className="bg-gray-100 w-full sm:w-48 p-4">
      <ul className="flex sm:flex-col gap-4">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:bg-gray-200 ${isActive ? 'font-semibold text-blue-600' : 'text-gray-700'}`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
