import { Logout32, Search32, Workspace32 } from '@carbon/icons-react';
import React, { useEffect } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import useSelected from '../hooks/useSelected';
import clsx from 'clsx';
import axios from 'axios';
import { getCSRFToken } from '../utils';

type NavigationSelected = 'upcoming' | 'search';
type NavigationItem = { selected: boolean; icon: React.ReactNode } & LinkProps;

const DashboardLayout: React.FC = (props) => {
  const { children } = props;

  const location = useLocation();
  const selected = useSelected<NavigationSelected>('upcoming');

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    switch (path) {
      case 'upcoming':
      case 'search':
        selected.set(path);
        break;
    }
  }, [location, selected]);

  const handleLogout = async () => {
    try {
      await axios.delete(`http://localhost:3000/logout`, {
        headers: {
          'X-CSRF-Token': getCSRFToken(),
        },
      });
    } catch (err) {
      throw err;
    }
  };

  const navigationItems: NavigationItem[] = [
    {
      to: '/dashboard/upcoming',
      selected: selected.is('upcoming'),
      icon: <Workspace32 />,
    },
    {
      to: '/dashboard/search',
      selected: selected.is('search'),
      icon: <Search32 />,
    },
  ];

  return (
    <div className="h-screen">
      <nav className="h-full fixed bg-gray-800 shadow">
        <div className="flex flex-col items-center p-5">
          <div className="flex flex-col items-center space-y-4">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium',
                  item.selected
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                {item.icon}
              </Link>
            ))}
            <form method="post" action="http://localhost:3000/logout">
              <input type="hidden" name="authenticity_token" value={getCSRFToken()}/>
              <button
                type="submit"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
              >
                <Logout32 />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="ml-24">{children}</div>
    </div>
  );
};
export default DashboardLayout;
