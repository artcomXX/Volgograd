
        // ========== ДАННЫЕ ОБЪЕКТОВ ==========
        const locations = {
            churches: [
                { name: 'Александра Невского', coords: [48.70946, 44.51356], id: 'map-alexander' },
                { name: 'Сергия Радонежского', coords: [48.718864, 44.521339], id: 'map-radonezh' },
                { name: 'Иоанна Кронштадского', coords: [48.769750, 44.54030], id: 'map-kronstadt' },
                { name: 'Казанский собор', coords: [48.699167, 44.484167], id: 'map-kazan' },
                { name: 'Иоанна Предтечи', coords: [48.701375, 44.514794], id: 'map-john' }
            ],
            monuments: [
                { name: 'Мельница Гергардта', coords: [48.715518, 44.532997], id: 'map-melnitsa' },
                { name: 'Дом Павлова', coords: [48.716111, 44.531667], id: 'map-pavlov' },
                { name: 'Памятник Ленину', coords: [48.527664, 44.558917], id: 'map-lenin' },
                { name: 'Катер «Гаситель»', coords: [48.697598, 44.512922], id: 'map-gasitel' },
                { name: 'Элеватор', coords: [48.687953, 44.480055], id: 'map-elevator' },
                { name: 'Мамаев курган', coords: [48.742222, 44.536944], id: 'map-mamaev' },
                { name: 'Аллея Героев', coords: [48.705926, 44.518610], id: 'map-alley' }
            ],
            theaters: [
                { name: 'Кукольный театр', coords: [48.707870, 44.507282], id: 'map-puppet' },
                { name: 'ТЮЗ', coords: [48.690798, 44.488382], id: 'map-youth' },
                { name: 'Казачий театр', coords: [48.694967, 44.497474], id: 'map-cossack' },
                { name: 'Царицынская опера', coords: [48.766522, 44.560049], id: 'map-opera' },
                { name: 'Музыкальный театр', coords: [48.705402, 44.522194], id: 'map-musical' }
            ],
            museums: [
                { name: 'Музей-панорама', coords: [48.715009, 44.532817], id: 'map-museum-battle' },
                { name: 'Россия — моя история', coords: [48.700061, 44.512581], id: 'map-museum-russia' },
                { name: 'Краеведческий музей', coords: [48.704981, 44.512517], id: 'map-museum-regional' },
                { name: 'Мемориальный музей', coords: [48.711330, 44.514684], id: 'map-museum-memorial' },
                { name: 'Планетарий', coords: [48.714479, 44.524603], id: 'map-museum-planetarium' }
            ],
            other: [
                { name: 'Фонтан «Искусство»', coords: [48.704622, 44.5205], id: 'map-fountain-art' },
                { name: 'Каланча пожарной команды', coords: [48.7098, 44.51], id: 'map-fire-tower' },
                { name: 'Ж/д вокзал', coords: [48.712555, 44.513508], id: 'map-train-station' },
                { name: 'Метротрам', coords: [48.7175, 44.5305], id: 'map-metrotram' }
            ],
            geo: [
                { name: 'Волго-Донской канал', coords: [48.500495, 44.25020], id: 'map-volga-don' },
                { name: 'Волжская ГЭС', coords: [48.8261, 44.67207], id: 'map-ges' },
                { name: 'Речной вокзал', coords: [48.701056, 44.519381], id: 'map-river-station' },
                { name: 'Набережная', coords: [48.703668, 44.52181], id: 'map-embankment' },
                { name: '«Танцующий» мост', coords: [48.721537, 44.550421], id: 'map-dancing-bridge' }
            ]
        };

        let map;
        let markers = {};
        let activeCategory = null;

        // ========== ИНИЦИАЛИЗАЦИЯ КАРТЫ ==========
        ymaps.ready(function() {
            map = new ymaps.Map("map", {
                center: [48.7080, 44.5133],
                zoom: 13,
                controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
            });

            // Создаём маркеры для всех категорий
            Object.keys(locations).forEach(category => {
                markers[category] = [];
                locations[category].forEach((loc, index) => {
                    const placemark = new ymaps.Placemark(loc.coords, {
                        balloonContentHeader: loc.name,
                        balloonContentBody: `<strong>${loc.name}</strong><br>Кликните для перехода`,
                        hintContent: loc.name
                    }, {
                        preset: 'islands#blueCircleIcon',
                        iconColor: getCategoryColor(category)
                    });
                    
                    // Клик по маркеру
                    placemark.events.add('click', function(e) {
                        e.stopPropagation();
                        openMainPage(category, index, e);
                    });
                    
                    map.geoObjects.add(placemark);
                    markers[category].push(placemark);
                });
            });
        });

        // ========== ФУНКЦИИ ==========

        // Цвет категории для иконок
        function getCategoryColor(category) {
            const colors = {
                churches: '#8B4513',    // коричневый
                monuments: '#8B1A2A',   // красный
                theaters: '#4B0082',    // фиолетовый
                museums: '#2E8B57',     // зелёный
                other: '#FF8C00',       // оранжевый
                geo: '#1E90FF'          // синий
            };
            return colors[category] || '#2398F2';
        }

        // Подсветка/снятие подсветки категории
        function toggleCategory(category, event) {
            if (event && (event.shiftKey || event.detail === 2)) {
                // Shift+клик или двойной клик — переход
                openMainPage(category, 0, event);
                return;
            }
            
            // Обычный клик — подсветка
            const categoryEl = document.querySelector(`[data-category="${category}"]`);
            
            // Снимаем подсветку со всех
            document.querySelectorAll('.plan-category').forEach(el => el.classList.remove('active'));
            clearHighlights();
            
            // Если кликнули на активную — снимаем
            if (activeCategory === category) {
                activeCategory = null;
                return;
            }
            
            // Подсвечиваем выбранную
            activeCategory = category;
            categoryEl.classList.add('active');
            highlightMarkers(category);
            
            // Центрируем карту на первом объекте категории
            if (locations[category][0]) {
                map.setCenter(locations[category][0].coords, 14);
            }
        }

        // Подсветить маркеры категории
        function highlightMarkers(category) {
            clearHighlights();
            if (markers[category]) {
                markers[category].forEach(marker => {
                    marker.options.set('preset', 'islands#circleIcon');
                    marker.options.set('iconColor', getCategoryColor(category));
                    // Добавляем визуальный эффект через фильтр (если поддерживается)
                    const element = marker.getOverlay().getElement();
                    if (element) element.classList.add('highlighted');
                });
            }
        }

        // Снять подсветку со всех маркеров
        function clearHighlights() {
            Object.keys(markers).forEach(cat => {
                markers[cat].forEach(marker => {
                    marker.options.set('preset', 'islands#blueCircleIcon');
                    const element = marker.getOverlay().getElement();
                    if (element) element.classList.remove('highlighted');
                });
            });
        }

        // Переход на главную страницу к нужному объекту
        function openMainPage(category, index, event) {
            event?.preventDefault();
            event?.stopPropagation();
            
            // Маппинг категорий на секции главной страницы
            const sectionMap = {
                churches: 'attraction-section',
                monuments: 'museums-section',
                theaters: 'theaters-section',
                museums: 'real-museums-section',
                other: 'other-section',
                geo: 'geo-section'
            };
            
            const section = sectionMap[category];
            if (!section) return;
            
            // Формируем ссылку с параметрами
            const params = new URLSearchParams({
                section: section,
                slide: index,
                category: category
            });
            
            // Переход
            window.location.href = `../index.html?${params.toString()}`;
        }

        // Обработка параметров из URL при загрузке (если вернулись с главной)
        window.addEventListener('load', function() {
            const params = new URLSearchParams(window.location.search);
            const category = params.get('category');
            const slide = params.get('slide');
            
            if (category && locations[category]) {
                // Подсвечиваем категорию
                toggleCategory(category, null);
                
                // Центрируем на нужном объекте
                if (slide && locations[category][slide]) {
                    map.setCenter(locations[category][slide].coords, 16);
                }
            }
        });

        // Обработка двойного клика по категориям
        document.querySelectorAll('.plan-category').forEach(el => {
            el.addEventListener('dblclick', function(e) {
                const category = this.dataset.category;
                openMainPage(category, 0, e);
            });
        });
// ========== ОБРАБОТКА ПЕРЕХОДА С КАРТЫ ==========

// Проверяем параметры в URL
const urlParams = new URLSearchParams(window.location.search);
const targetSection = urlParams.get('section');
const targetSlide = urlParams.get('slide');
const targetCategory = urlParams.get('category');

if (targetSection && targetSlide !== null) {
    // Прокручиваем к нужной секции
    const section = document.getElementById(targetSection) || document.querySelector(`.${targetSection}`);
    if (section) {
        // Ждём инициализации слайдеров
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Если это слайдер — переключаем на нужный слайд
            if (targetCategory) {
                const sliderMap = {
                    'attraction-section': { slides: churchSlides, total: totalChurchSlides, update: updateChurchArrows },
                    'museums-section': { slides: museumSlides, total: totalMuseumSlides, update: updateMuseumArrows },
                    'theaters-section': { slides: theaterSlides, total: totalTheaterSlides, update: updateTheaterArrows },
                    'real-museums-section': { slides: realMuseumSlides, total: totalRealMuseumSlides, update: updateRealMuseumArrows },
                    'other-section': { slides: otherSlides, total: totalOtherSlides, update: updateOtherArrows },
                    'geo-section': { slides: geoSlides, total: totalGeoSlides, update: updateGeoArrows }
                };
                
                const slider = sliderMap[targetSection];
                if (slider && slider.slides[targetSlide]) {
                    // Переключаем слайд
                    slider.slides.forEach((s, i) => {
                        s.classList.remove('active', 'next', 'prev');
                        s.classList.add(i == targetSlide ? 'active' : 'next');
                    });
                    slider.update();
                    
                    // Обновляем карту слайда
                    const updateMap = {
                        'attraction-section': updateCurrentChurchMap,
                        'museums-section': updateCurrentMuseumMap,
                        'theaters-section': updateCurrentTheaterMap,
                        'real-museums-section': updateCurrentRealMuseumMap,
                        'other-section': updateCurrentOtherMap,
                        'geo-section': updateCurrentGeoMap
                    };
                    if (updateMap[targetSection]) {
                        setTimeout(updateMap[targetSection], 500);
                    }
                }
            }
        }, 800);
    }
    
    // Очищаем URL
    history.replaceState(null, null, window.location.pathname);
}