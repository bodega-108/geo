import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Inicio', exact: true },
    { path: '/map', label: '🗺️ Mapa' },
    { path: '/locations', label: '📍 Ubicaciones' },
    { path: '/about', label: 'ℹ️ Acerca de' }
  ];

  return (
    <nav className="bg-slate-700 shadow-lg w-full">
      <div className="w-full flex items-center justify-center h-15">
        <ul className="flex gap-0 list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path) && item.path !== '/';
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`
                    block px-5 py-5 text-gray-200 no-underline transition-all duration-300 border-b-3 border-transparent
                    hover:bg-slate-600
                    ${isActive 
                      ? 'bg-slate-600 border-b-blue-500 text-white font-medium' 
                      : ''
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
