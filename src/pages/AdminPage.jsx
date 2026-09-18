import React, { useState, useEffect } from 'react';

function AdminPage({ tours, addTour, updateTour, deleteTour, resetToDefault }) {
  // Исходный шаблон пустой формы для сброса полей после сохранения или отмены
  const emptyForm = {
    title: '',
    location: '',
    price: '',
    duration: '',
    image: '',
    description: ''
  };

  // formData: объект текущих значений всех инпутов формы
  const [formData, setFormData] = useState(emptyForm);

  // editingId: идентификатор редактируемого тура (null = режим создания новой карточки)
  const [editingId, setEditingId] = useState(null);

  // notification: текст всплывающего уведолмления 
  const [notification, setNotification] = useState(null);

  // bookings: массив входящих клиентских броней для таблички 
  const [bookings, setBookings] = useState([]);

  // Срабатывает  один раз при создании компонента (пустой массив зависимостей []).
  // Считывает ранее сохраненные пользователями заявки из localStorage.
  useEffect(() => {
    const saved = localStorage.getItem('karelia_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (err) {
        console.error('Ошибка чтения заявок из localStorage:', err);
      }
    }
  }, []);

  // Обновляет  компонент и одновременно перезаписывает JSON в памяти браузера
  const updateBookingsStorage = (updatedList) => {
    setBookings(updatedList);
    localStorage.setItem('karelia_bookings', JSON.stringify(updatedList));
  };

  // Находит заявку по id через .map() и обновляет только поле status ('new' | 'in_progress' | 'confirmed')
  const handleStatusChange = (bookingId, newStatus) => {
    const updated = bookings.map((item) =>
      item.id === bookingId ? { ...item, status: newStatus } : item
    );
    updateBookingsStorage(updated);
  };

  // Удаление заявки
  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Удалить эту заявку?')) {
      const updated = bookings.filter((item) => item.id !== bookingId);
      updateBookingsStorage(updated);
      showNotification('Заявка удалена');
    }
  };

  // уведомление
  // Задает текст сообщения и ставит таймер на 3 секунды для автоматического скрытия
  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартную отправку формы и перезагрузку страницы

    // валидация на клиенте: название не должно быть пробелами, цена обязательна
    if (!formData.title.trim() || !formData.price) {
      alert('Пожалуйста, введите название тура и его стоимость.');
      return;
    }

    if (editingId) {
      // Режим обновления: вызываем метод контекста и сбрасываем флаг редактирования
      updateTour(editingId, formData);
      showNotification('Карточка тура успешно обновлена!');
      setEditingId(null);
    } else {
      // Режим создания: передаем новый объект в общий массив туров
      addTour(formData);
      showNotification('Новый тур добавлен в каталог!');
    }

    // Очищаем форму
    setFormData(emptyForm);
  };

  // редактирование
  // Заполняет инпуты данными выбранной карточки 
  const handleEditClick = (tour) => {
    setEditingId(tour.id);
    setFormData({
      title: tour.title,
      location: tour.location || '',
      price: tour.price || '',
      duration: tour.duration || '',
      image: tour.image || '',
      description: tour.description || ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Отмена редактирования с возвратом формы в исходное состояние
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  // удаление
  const handleDeleteClick = (tour) => {
    const isConfirmed = window.confirm(`Удалить тур "${tour.title}"?`);
    if (isConfirmed) {
      deleteTour(tour.id);
      showNotification(`Тур "${tour.title}" удален.`);

      // Если в этот момент удаляемый тур был открыт в форме — сбрасываем ее
      if (editingId === tour.id) {
        handleCancelEdit();
      }
    }
  };

  // сброс к исходным данным
  //текущий список туров заменяется исходным массивом, после обновляет интерфейс
  const handleReset = () => {
    const isConfirmed = window.confirm('Сбросить список туров к исходным данным?');
    if (isConfirmed) {
      resetToDefault();
      handleCancelEdit();
      showNotification('Список туров сброшен.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs tracking-wider px-5 py-3 shadow-lg">
          {notification}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-6 mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-forests text-stone-900">Панель управления</h1>
          <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">
            Управление маршрутами и заявками
          </p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 border border-stone-300 px-4 py-2 hover:bg-stone-100 transition self-start sm:self-auto"
        >
          Сбросить к исходным
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-5 bg-white p-6 border border-stone-200">
          <h2 className="text-lg font-unifix text-stone-900 mb-6">
            {editingId ? 'Редактирование тура' : 'Добавить новый тур'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-unifix text-xs uppercase tracking-wider text-stone-600 mb-1">
                Название маршрута *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-unifix text-xs uppercase tracking-wider text-stone-600 mb-1">
                  Локация
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-unifix uppercase tracking-wider text-stone-600 mb-1">
                  Длительность
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="3 дня / 2 ночи"
                  className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-unifix uppercase tracking-wider text-stone-600 mb-1">
                Стоимость (₽) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-unifix uppercase tracking-wider text-stone-600 mb-1">
                Ссылка на изображение (URL)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-unifix uppercase tracking-wider text-stone-600 mb-1">
                Описание маршрута
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 outline-none"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-stone-900 text-stone-50 text-xs uppercase tracking-wider py-3 hover:bg-stone-800 transition"
              >
                {editingId ? 'Сохранить изменения' : 'Добавить тур'}
              </button>

              {/* Кнопка отмены: отображается только при активном режиме правки */}
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full border border-stone-300 text-stone-600 text-xs uppercase tracking-wider py-2 hover:bg-stone-50 transition"
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>

        {/* колонка с карточками*/}
        <div className="lg:col-span-7">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
              Карточки на сайте ({tours.length})
            </h2>
          </div>

          {tours.length === 0 ? (
            <div className="bg-white border border-stone-200 p-8 text-center text-sm text-stone-500">
              Пока нет созданных туров. Добавьте первый тур через форму слева.
            </div>
          ) : (
            // Сетка по 2 карточки в ряд на экранах от sm (640px)
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tours.map((tour) => {
                const isEditing = editingId === tour.id;

                return (
                  <div
                    key={tour.id}
                    className={`bg-white border flex flex-col justify-between overflow-hidden transition ${
                      isEditing
                        ? 'border-stone-900 ring-2 ring-stone-900' // Визуальное выделение редактируемой карточки
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div>
                      <div className="h-44 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={tour.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                          alt={tour.title}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                          {tour.location || 'Карелия'} {tour.duration ? `• ${tour.duration}` : ''}
                        </p>

                        <h3 className="font-unifix text-lg text-stone-900 mb-2">
                          {tour.title}
                        </h3>

                        {tour.description && (
                          <p className="text-xs text-stone-600 mb-3 line-clamp-2">
                            {tour.description}
                          </p>
                        )}

                        <p className="text-sm font-semibold text-stone-900">
                          {Number(tour.price).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>

                    {/* Панель кнопок админа: Изменить и Удалить */}
                    <div className="p-4 pt-0 border-t border-stone-100 flex gap-2">
                      <button
                        onClick={() => handleEditClick(tour)}
                        className={`flex-1 py-2 text-xs uppercase tracking-wider border transition ${
                          isEditing
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {isEditing ? 'Правка' : 'Изменить'}
                      </button>

                      <button
                        onClick={() => handleDeleteClick(tour)}
                        className="py-2 px-3 text-xs uppercase tracking-wider border border-red-200 text-red-600 hover:bg-red-50 transition"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* таблица заявок(то типу списка задач*/}
      <div className="mt-16 pt-10 border-t border-stone-200">
        <div className="mb-6">
          <h2 className="text-2xl font-ruthless text-stone-900">
            Заявки на бронирование ({bookings.length})
          </h2>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-stone-200 p-8 text-center text-xs uppercase tracking-wider text-stone-400">
            Новых заявок пока нет. Оставьте заявку через каталог, чтобы проверить работу.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-stone-200">
            <table className="w-full text-left text-xs">
              {/* Шапка таблицы */}
              <thead className="bg-stone-50 border-b border-stone-200 uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="py-3 px-4 font-normal">Имя клиента</th>
                  <th className="py-3 px-4 font-normal">Телефон</th>
                  <th className="py-3 px-4 font-normal">Выбранный тур</th>
                  <th className="py-3 px-4 font-normal">Дата</th>
                  <th className="py-3 px-4 font-normal">Статус</th>
                  <th className="py-3 px-4 font-normal text-right">Действие</th>
                </tr>
              </thead>
              
              {/* Тело таблицы с заявками */}
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-stone-50/70 transition">
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      {booking.clientName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {booking.clientPhone}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-800">
                      {booking.tourTitle}
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                      {booking.createdAt}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={booking.status || 'new'}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`text-[11px] px-2 py-1 border outline-none cursor-pointer ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : booking.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-stone-800 border-stone-300'
                        }`}
                      >
                        <option value="new">Новая</option>
                        <option value="in_progress">В работе</option>
                        <option value="confirmed">Подтверждена</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-[11px] uppercase tracking-wider text-stone-400 hover:text-red-600 transition"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
export default AdminPage