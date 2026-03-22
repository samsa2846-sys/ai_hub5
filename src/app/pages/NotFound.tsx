import React from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-semibold text-[#1F2937] mb-4">404</h1>
        <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Страница не найдена</h2>
        <p className="text-[#6B7280] mb-6">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home className="w-5 h-5" />
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
