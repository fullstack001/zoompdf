'use client';
import { useState } from 'react';
import { CreditCard, LogOut, Star, User } from 'lucide-react';

const items = [
  { label: 'Account', icon: User },
  { label: 'Payment', icon: CreditCard },
  { label: 'Membership', icon: Star },
  { label: 'Logout', icon: LogOut },
];

export default function SettingsSidebar() {
  const [active, setActive] = useState('Account');

  return (
    <aside className="w-64 bg-white rounded-lg shadow p-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Settings</h2>
      <ul className="space-y-2">
        {items.map(({ label, icon: Icon }) => (
          <li
            key={label}
            onClick={() => setActive(label)}
            className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition border-b-2 ${
              active === label
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            <Icon size={16} />
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
