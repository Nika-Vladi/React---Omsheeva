import React from 'react';

 function Footer() {
  return (
    <footer className="border-t border-stone-300/50 py-12 mt-auto bg-stone-100/30 backdrop-blur-sm">
      <div className="  max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 tracking-[0.15em] uppercase gap-4">
        <div>
          © {new Date().getFullYear()} STONE & PINE. • северные маршруты
        </div>
        <div className="flex gap-6 text-stone-700 font-ruthless">
          <span>Сортавала</span>
          <span>•</span>
          <span>Петрозаводск</span>
          <span>•</span>
          <span>Ладога</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer