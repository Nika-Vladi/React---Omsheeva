import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const guides = [
  {
    id: '01',
    name: 'Илья Северный',
    role: 'Старший инструктор-топограф',
    exp: '11 лет в автономных экспедициях',
    powerPlace: 'Гора Воттоваара',
    coords: '63°04′ N, 32°37′ E',
    credo: 'Тайга не прощает суеты. Чтобы услышать её голос, нужно сначала полностью замолчать самому.',
    skills: ['Аттестация ФСТР', 'Радиосвязь и GPS-навигация', 'Доврачебная помощь в глухой тайге'],
    gear: 'Шведский топорик ручной ковки и компас Adrianov',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '02',
    name: 'Алёна Романова',
    role: 'Шкипер каякерских групп',
    exp: '7 сезонов на открытой Ладоге',
    powerPlace: 'Ладожские шхеры (о. Хонкасало)',
    coords: '61°41′ N, 30°42′ E',
    credo: 'Ладога переменчива, как океан. Мы учим не бороться с волной, а двигаться вместе с её ритмом.',
    skills: ['Шкипер маломерного судна', 'Спасатель на бурной воде', 'Метеонаблюдение'],
    gear: 'Морской неопреновый каяк и спутниковый трекер',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '03',
    name: 'Михаил Каллио',
    role: 'Этнограф и краевед',
    exp: '14 лет полевых исследований',
    powerPlace: 'Онежские петроглифы (Бесов Нос)',
    coords: '61°40′ N, 36°01′ E',
    credo: 'Карелия — это не просто скалы и сосны, это живой эпос «Калевала», высеченный в камне пять тысяч лет назад.',
    skills: ['Исследователь саамских святилищ', 'Знаток карельских рун', 'Организация базовых лагерей'],
    gear: 'Полевой блокнот, геологическая лупа и термос с чагой',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function AboutPage() {
  // 2. СОСТОЯНИЕ ВЫБРАННОГО ПРОВОДНИКА (Хук useState)
  // Хранит числовой индекс активного элемента (по умолчанию 0 — первый гид)
  const [activeGuide, setActiveGuide] = useState(0);

  // Вычисляемое значение (Derived State):
  // Извлекаем объект текущего выбранного гида без создания лишних стейтов
  const current = guides[activeGuide];

  return (
    <div className="py-16 md:py-24 max-w-6xl mx-auto px-6">
      
      {/* шапка раздела с информ*/}
      <div className="border-b border-stone-200 pb-10 mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3">Команда</p>
        <h1 className="font-ruthless text-5xl font-bold md:text-5xl text-stone-900 tracking-tight leading-tight">
          Люди, которые знают тропы, скрытые от посторонних глаз
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-5">
          <h2 className="text-xl font-normal font-ruthless text-stone-900 leading-snug">
            Мы не водим автобусные экскурсии. Мы делимся личным опытом жизни в дикой природе Севера.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-4 text-stone-600 text-sm md:text-base leading-relaxed font-light">
          <p>
            Безопасность и глубина любого похода зависят от того, кто идет во главе тропы. Наши проводники — это спасатели, профессиональные топографы и исследователи, для которых тайга стала вторым домом задолго до того, как Карелия стала туристическим трендом.
          </p>
          <p>
            Мы берем группы максимум до 8 человек, чтобы каждый участник находился под постоянным вниманием наставника, научился читать северный лес и чувствовал себя в абсолютной безопасности.
          </p>
        </div>
      </div>

      {/* галлерея проводников */}
      <div className="border-t border-stone-200 pt-16 mb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-1">Экспедиторы</p>
            <h2 className="font-forests text-2xl md:text-3xl font-light text-stone-900">Проводники Севера</h2>
          </div>
          <span className="text-xs font-mono text-stone-400 hidden sm:inline-block">
            Кликните для выбора проводника
          </span>
        </div>

        {/* карточки проводников сетка
            Рендерится через .map() активная карточка черным  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {guides.map((guide, idx) => {
            const isSelected = activeGuide === idx;
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => setActiveGuide(idx)}
                className={`text-left p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-md'
                    : 'bg-white/60 hover:bg-white border-stone-200 text-stone-900'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className={`w-14 h-14 object-cover grayscale ${
                      isSelected ? 'contrast-125' : 'contrast-100 opacity-80'
                    }`}
                  />
                  <div>
                    <span className={`text-[10px] font-mono block ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                      {guide.id} • {guide.exp}
                    </span>
                    <h3 className="text-base font-medium leading-snug mt-0.5">{guide.name}</h3>
                  </div>
                </div>
                <p className={`text-xs ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {guide.role}
                </p>
              </button>
            );
          })}
        </div>

        {/* полная карточка проводника-развернутая 
            Данные берутся из переменной current */}
        <div className="bg-white/80 backdrop-blur-sm border border-stone-200 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Фотография и географические координаты (4 колонки) */}
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover grayscale contrast-110"
              />
            </div>
            <div className="mt-4 pt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>{current.coords}</span>
              <span className="uppercase">{current.powerPlace}</span>
            </div>
          </div>

          {/* Подробное описание*/}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mb-2">
                <span>ПРОФИЛЬ № {current.id}</span>
                <span>•</span>
                <span>СТАЖ: {current.exp}</span>
              </div>
              <h3 className="text-2xl font-light text-stone-900 mb-1">{current.name}</h3>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-6">{current.role}</p>

              {/* Цитата-кредо  */}
              <div className="border-l-2 border-stone-900 pl-4 py-1 mb-8 bg-stone-50/50">
                <p className="text-stone-800 text-sm md:text-base italic font-light leading-relaxed">
                  «{current.credo}»
                </p>
              </div>

              {/* Компетенции и обязательное снаряжение */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-stone-400 font-mono mb-2">
                    Квалификация & Допуски
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {/* Рендеринг списка навыков проводника */}
                    {current.skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-stone-400 rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-stone-400 font-mono mb-2">
                    Неотъемлемое снаряжение
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {current.gear}
                  </p>
                  <div className="mt-4">
                    <span className="text-[10px] uppercase text-stone-400 font-mono block">Место силы:</span>
                    <span className="text-xs font-medium text-stone-900">{current.powerPlace}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-light">
                Илья, Алёна и Михаил лично курируют каждый групповой маршрут сезона.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* блок безопасности*/}
      <div className="border-t border-stone-200 pt-16 mb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-8">Стандарты выходов</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 backdrop-blur-sm border border-stone-200">
            <span className="text-xs font-mono text-stone-400">01</span>
            <h3 className="text-base font-medium text-stone-900 mt-2 mb-2">Спутниковый контроль</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              На каждом выходе вне зоны сотовой связи группа оснащается спутниковыми маяками Garmin inReach для непрерывного трекинга.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-stone-200">
            <span className="text-xs font-mono text-stone-400">02</span>
            <h3 className="text-base font-medium text-stone-900 mt-2 mb-2">Регистрация в МЧС</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              100% наших пеших, байдарочных и снегоходных маршрутов официально регистрируются в спасательных службах Республики Карелия.
            </p>z
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-stone-200">
            <span className="text-xs font-mono text-stone-400">03</span>
            <h3 className="text-base font-medium text-stone-900 mt-2 mb-2">Группы до 8 человек</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Мы намеренно ограничиваем число мест. Это сохраняет камерную дружескую атмосферу и дает возможность уделить время каждому.
            </p>
          </div>
        </div>
      </div>
      {/* Ссылка Link возвращает  в общий каталог туров /tours без перезагрузки */}
      <div className="text-center border-t border-stone-200 pt-16">
        <h3 className="text-2xl font-light font-ruthless text-stone-900 mb-4">Готовы выйти на маршрут с нашими гидами?</h3>
        <p className="text-sm text-stone-600 mb-8 max-w-md mx-auto">
          Выберите актуальный тур в каталоге или напишите нам для подбора проводника под ваши даты.
        </p>
        <Link
          to="/tours"
          className="inline-block border border-stone-900 bg-stone-900 text-stone-50 px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-stone-900 transition-colors"
        >
          Выбрать маршрут
        </Link>
      </div>
    </div>
  );
}