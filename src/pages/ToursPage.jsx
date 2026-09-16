
import React, { useState } from 'react';
// Презентационный компонент карточки
import TourCard from '../components/TourCard';
// Модальное окно оформления бронирования
import BookingModal from '../components/BookingModal';
// Навигационная ссылка (для возможного возврата или перехода к действиям)
import { Link } from 'react-router-dom';

export default function ToursPage({ tours }) {
  // Хранит текст, введенный пользователем в поисковую строку
  const [search, setSearch] = useState('');

  // видимость окна: true — модалка показана, false — скрыта
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Выбранный тур, данные которого передаются в модальное окно
  const [selectedTour, setSelectedTour] = useState(null);

  // Выполняется при каждом рендере, если изменились tours или search.
  const filteredTours = tours.filter((tour) => {
    // Конкатенируем поля названия, локации и описания в единую строку для сквозного поиска
    const text = (
      tour.title + ' ' + 
      (tour.location || '') + ' ' + 
      (tour.description || '')
    ).toLowerCase();

    // Метод .includes() проверяет наличие поисковой подстроки без учета регистра
    return text.includes(search.toLowerCase().trim());
  });
  // Принимает объект тура от дочернего компонента TourCard, сохраняет его и открывает окно
  const handleOpenBooking = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <div className="py-16 max-w-6xl mx-auto px-6">
      <div className="border-b border-stone-200 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-2">
            Каталог экспедиций
          </p>
          <h1 className="font-forests text-3xl md:text-4xl font-light text-stone-900">
            Все туры по Карелии
          </h1>
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Поиск по названию или месту..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-stone-300 bg-white px-4 py-2.5 text-xs tracking-wider outline-none focus:border-stone-900 transition"
          />
        </div>
      </div>

      {filteredTours.length === 0 ? (
        // Блок заглушки: отображается, если поиск не дал совпадений или массив пуст
        <div className="text-center py-20 bg-white border border-stone-200 p-8">
          <p className="text-stone-500 text-sm mb-4">
            {search ? 'По вашему запросу ничего не найдено.' : 'Список туров пуст.'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="inline-block border border-stone-900 bg-stone-900 text-stone-50 px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-stone-800 transition"
            >
              Сбросить фильтр
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard 
              key={tour.id} // Стабильный уникальный ключ для алгоритма согласования (Reconciliation) React
              tour={tour} 
              onBook={handleOpenBooking}
            />
          ))}
        </div>
      )}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tours={tours}
        initialTourId={selectedTour?.id}
      />
    </div>
  );
}