
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  //СОСТОЯНИЕ МОБИЛЬНОГО МЕНЮ 
  // false — меню свернуто, true — выпадающая панель открыта на смартфонах
  const [isOpen, setIsOpen] = useState(false);

  // NavLink автоматически передает в функцию аргумент { isActive }.
  // Если текущий URL совпадает с path ссылки — добавляем жирный шрифт и подчеркивание снизу.
  const getNavLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-[0.2em] transition-colors py-1 ${
      isActive
        ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
        : 'text-stone-600 hover:text-stone-900'
    }`;

  // На смартфонах активная вкладка подсвечивается вертикальной линией слева (border-l-2).
  const getMobileNavLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-[0.2em] transition-colors py-2 block ${
      isActive
        ? 'text-stone-900 font-semibold border-l-2 border-stone-900 pl-3'
        : 'text-stone-600 hover:text-stone-900 pl-3'
    }`;

  return (
    <header className="border-b border-stone-300/50 bg-stone-100/40 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-xl font-forests bold tracking-[0.25em] font-light uppercase text-stone-900 group"
        >
          STONE & <span className="font-forests text-stone-600 transition-colors group-hover:text-stone-900">PINE</span>
        </Link>

        {/* ДЕСКТОПНОЕ МЕНЮ: */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={getNavLinkClass}>Главная</NavLink>
          <NavLink to="/tours" className={getNavLinkClass}>Туры</NavLink>
          <NavLink to="/about" className={getNavLinkClass}>О нас</NavLink>
          <NavLink to="/admin" className={getNavLinkClass}>Админка</NavLink>
        </nav>

        {/*КНОПКА-БУРГЕР ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ:*/}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Меню навигации"
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
        >
          <span 
            className={`h-0.5 w-6 bg-stone-900 transition-transform duration-200 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`} 
          />
          <span 
            className={`h-0.5 w-6 bg-stone-900 transition-transform duration-200 ${
              isOpen ? '-rotate-45' : ''
            }`} 
          />
        </button>
      </div>

      {/*ВЫПАДАЮЩЕЕ МОБИЛЬНОЕ МЕНЮ:*/}
      {isOpen && (
        <div className="md:hidden border-t border-stone-300/50 bg-stone-100/90 backdrop-blur-lg px-6 py-4 flex flex-col gap-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>Главная</NavLink>
          <NavLink to="/tours" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>Туры</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>О нас</NavLink>
          <NavLink to="/admin" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass}>Админка</NavLink>
        </div>
      )}
    </header>
  );
}
export default Navbar