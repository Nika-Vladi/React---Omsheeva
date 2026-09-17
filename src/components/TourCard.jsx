import React from 'react';

function TourCard({ tour, onBook }) {
  // Запасное дефолтное изображение на случай, если  забыли ссылку в туре добавить
  const fallback = "/ImageCard/ruskeala.jpeg";

  return (
    <div className="group flex flex-col bg-white border border-stone-200 transition duration-300 hover:border-stone-400">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={tour.image || fallback}
          alt={tour.title}
          // Обработчик сетевой ошибки: если внешний URL недоступен или выдал 404,
          // подставляется дефолтная картинку
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* есл нет продолжительности- выводится не будет , а так плашка с кол.дней тура */}
        {tour.duration && (
          <span className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur text-stone-100 text-[11px] tracking-wider uppercase px-2.5 py-1">
            {tour.duration}
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Локация если передана */}
          {tour.location && (
            <p className="text-[11px] uppercase tracking-widest text-stone-400 mb-2">
              {tour.location}
            </p>
          )}

          <h3 className="text-lg font-ruthless font-medium text-stone-900 mb-2 leading-snug">
            {tour.title}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
            {tour.description}
          </p>
        </div>

        {/* КАРТОЧКA */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-widest text-stone-400">
              Стоимость
            </span>
            {/* метод  форматирует 12000 в 12 000 */} 
            <span className="text-base font-semibold text-stone-700">
              {Number(tour.price).toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Кнопка бронирования: вызывает callback onBook, передавая наверх весь объект tour */}
          <button
            type="button"
            onClick={() => onBook(tour)}
            className="w-full py-2.5 bg-stone-700 text-stone-100 text-xs uppercase tracking-widest hover:bg-stone-800 transition"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}
export default TourCard