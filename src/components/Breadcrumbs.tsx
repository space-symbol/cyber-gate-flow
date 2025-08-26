import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      
      let label = '';
      switch (name) {
        case 'auth':
          label = 'Аутентификация';
          break;
        case 'login':
          label = 'Вход';
          break;
        case 'register':
          label = 'Регистрация';
          break;
        case 'devices':
          label = 'Устройства';
          break;
        default:
          label = name.charAt(0).toUpperCase() + name.slice(1);
      }
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: index === pathnames.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length === 0) {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4" aria-label="Хлебные крошки">
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Главная страница"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <ChevronRight className="w-4 h-4" />
          {breadcrumb.isActive ? (
            <span className="text-foreground font-medium" aria-current="page">
              {breadcrumb.label}
            </span>
          ) : (
            <Link 
              to={breadcrumb.path}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
