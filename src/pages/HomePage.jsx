import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Доступ к глобальному состоянию туров
// Презентационная карточка тура
import TourCard from '../components/TourCard';
// Всплывающее окно оформления брони
import BookingModal from '../components/BookingModal';

 function HomePage({ tours }) {  
  //  берет первые 3 объекта из массива без мутации исходных данных.
  const featured = Array.isArray(tours) ? tours.slice(0, 3) : [];

  // видимость модального окна (true / false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Объект выбранного тура, на карточке которого нажали «Забронировать»
  const [selectedTour, setSelectedTour] = useState(null);

  // обработчик клика
  // Передается в дочерние карточки TourCard через проп onBook.
  // Принимает объект кликнутого тура и открывает модалку.
  const handleOpenBooking = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <div>
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-stone-950 text-stone-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/ImagePages/hero.jpeg"
            alt="Карелия"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-stone-950/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-300 mb-6 font-medium">
            Карелия • Места силы и северного покоя
          </p>

          <h1 className="font-ruthless text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.2] mb-8">
            Осознанные маршруты <br />
            <span className="font-ruthless text-3xl md:text-5xl lg:text-6xl text-stone-100 lowercase tracking-wider inline-block my-2">
              сквозь тишину
            </span>{' '}
            <br />
            тайги
          </h1>

          <p className="text-stone-300 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed font-light">
            Экспедиции на древние сейды, байдарочные переходы между шхерами и уединение на гранитных скалах под северным небом.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tours"
              className="w-full sm:w-auto inline-block border border-stone-100 bg-stone-100 text-stone-900 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-stone-100 transition-colors duration-200"
            >
              Смотреть каталог туров
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-2">Избранное</p>
              <h2 className="font-forests text-2xl md:text-3xl font-light text-stone-900">Популярные направления</h2>
            </div>
            
            <Link
              to="/tours"
              className="text-xs uppercase tracking-[0.2em] text-stone-600 hover:text-stone-900 pb-1 border-b border-stone-400 hover:border-stone-900 transition-colors"
            >
              Все маршруты ({tours ? tours.length : 0}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onBook={handleOpenBooking} 
              />
            ))}
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tours={tours}
        initialTourId={selectedTour?.id}
      />
    </div>
  );
}
export default HomePage