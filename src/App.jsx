import React, { useState, useEffect } from 'react';
// useState - хранение изменяемых данных
// useEffect - выполнение действий после изменения данных

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Router - включает маршрутизацию
// Routes - контейнер для маршрутов
// Route - отдельный маршрут (страница)

import { defaultTours } from './data/defaultTours';
// стартовый массив туров

import Navbar from './components/Navbar';
import Footer from './components/Footer';
// переиспользуемые компоненты сайта

import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
// страницы приложения

export default function App() {

  // Главный state приложения.
  // Здесь хранится весь список туров.
  const [tours, setTours] = useState(() => {

    try {
      // Получаем сохраненные туры из localStorage
      const saved = localStorage.getItem('karelia_tours');
      // Если данные есть
      if (saved) {
        // Превращаем строку обратно в массив объектов
        const parsed = JSON.parse(saved);
        // Проверяем что получили массив и он не пустой
        if (Array.isArray(parsed) && parsed.length > 0)
          return parsed;
      }
    } catch (e) {
      // Если произошла ошибка чтения
      console.error('Ошибка чтения localStorage:', e);
    }

    // Если данных нет — используем стартовые туры
    return defaultTours || [];
  });
  // useEffect срабатывает каждый раз,
  // когда меняется массив tours
  useEffect(() => {
    try {
      // Сохраняем туры в localStorage
      // JSON.stringify превращает массив в строку
      localStorage.setItem(
        'karelia_tours',
        JSON.stringify(tours)
      );
    } catch (e) {

      console.error('Ошибка сохранения в localStorage:', e);
    }
  }, [tours]);
  // [tours] — массив зависимостей
  // useEffect запускается только при изменении tours

  // добавление тура
  const addTour = (newTour) => {

    setTours(prev => [
      {...newTour, // копируем данные нового тура
        // создаем уникальный id
        id: Date.now().toString(),
        // преобразуем цену в число
        price: Number(newTour.price) || 0
      },
      // сохраняем старые туры
      ...prev]);
  };

  // редактирование тура
  const updateTour = (id, updatedTour) => {
    setTours(prev =>
      prev.map(item =>
        item.id === id
          // если нашли нужный тур —
          // обновляем его
          ? {...updatedTour,
              id,
              price: Number(updatedTour.price) || 0
            }
          // остальные туры оставляем без изменений
          : item
      )
    );
  };

  // удаление тура
  const deleteTour = (id) => {
    setTours(prev =>
      prev.filter(item => item.id !== id)
    );

  };
  // filter создает новый массив
  // без удаляемого тура

  // сброс к исходным
  const resetToDefault = () => {
    setTours(defaultTours || []);
  };

  return (
    // Router включает маршрутизацию React Router
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-stone-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage tours={tours} />
              }
            />
            {/* Передача массива туров через props */}
            <Route
              path="/tours"
              element={
                <ToursPage tours={tours} />
              }
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="/admin"
              element={
                <AdminPage
                  // список туров
                  tours={tours}
                  // функции CRUD
                  addTour={addTour}
                  updateTour={updateTour}
                  deleteTour={deleteTour}
                  // восстановление данных
                  resetToDefault={resetToDefault}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}