import React, { useState, useEffect } from 'react';

 function BookingModal({ isOpen, onClose, tours = [], initialTourId = null }) {
  //СОСТОЯНИЯ УПРАВЛЯЕМЫХ ПОЛЕЙ 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedId, setSelectedId] = useState('');
  
  // Флаг успешной отправки: переключает форму на экран «Заявка принята!»
  const [isSuccess, setIsSuccess] = useState(false);

  //СОСТОЯНИЯ ПРИ ОТКРЫТИИ 
  // Срабатывает каждый раз, когда меняется флаг isOpen или предвыбранный тур.
  // Очищает старый ввод пользователя и выставляет нужный тур в селекторе.
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setIsSuccess(false);
      // Если передан initialTourId — выбираем его, иначе берем id первого тура из массива (fallback)
      setSelectedId(initialTourId ? String(initialTourId) : (tours[0]?.id ? String(tours[0].id) : ''));
    }
  }, [isOpen, initialTourId, tours]);

  // Если isOpen === false, компонент возвращает null и вообще не создаёт узлы в реальном DOM.
  // Это оптимизирует память и избавляет от необходимости скрывать окно через display: none.
  if (!isOpen) return null;

  //ОБРАБОТЧИК ФОРМЫ
  const handleSubmit = (e) => {
    // Предотвращаем дефолтную отправку формы браузером (перезагрузку страницы)
    e.preventDefault();

    // Находим выбранный объект тура в массиве, чтобы зафиксировать его название в заявке
    const currentTour = tours.find((t) => String(t.id) === String(selectedId));

    // Формируем структуру данных входящего лида (Lead Data Model)
    const newBooking = {
      id: Date.now(), // Уникальный идентификатор заявки на основе миллисекунд
      clientName: name.trim(),
      clientPhone: phone.trim(),
      tourTitle: currentTour ? currentTour.title : 'Не указан',
      status: 'new',  // Начальный статус заявки
      createdAt: new Date().toLocaleDateString('ru-RU'),
    };

    // Считываем сохраненный список заявок, добавляем новую в начало массива и перезаписываем JSON
    const saved = JSON.parse(localStorage.getItem('karelia_bookings') || '[]');
    localStorage.setItem('karelia_bookings', JSON.stringify([newBooking, ...saved]));

    // Переводим окно в состояние успеха
    setIsSuccess(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-700/60 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()} //Останавливает всплытие события клика 
        className="relative w-full max-w-md bg-white border border-stone-200 p-6 shadow-2xl"
      >
        {/* Кнопка закрытия модалки (крестик) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl leading-none"
        >
          &times;
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-3">
            <h3 className="text-xl font-forests text-stone-700">Заявка принята!</h3>
            <p className="text-xs text-stone-600">Мы свяжемся с вами для подтверждения бронирования.</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-stone-700 text-white text-xs uppercase tracking-wider hover:bg-stone-800"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Экспедиция</p>
              <h3 className="text-xl font-unifix text-stone-700">Забронировать тур</h3>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                Ваше имя *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                Телефон для связи *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (000) 000-00-00"
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                Выберите маршрут
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-700 outline-none bg-white"
              >
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tour.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Кнопка отправки формы */}
            <button
              type="submit"
              className="w-full bg-stone-700 text-white text-xs uppercase tracking-widest py-3 hover:bg-stone-800 transition mt-2"
            >
              Отправить заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default BookingModal