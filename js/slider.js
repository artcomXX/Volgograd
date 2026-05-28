
window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
let heroScrolled = false;
let scrollTimeout;


function scrollToContent() {
    if (heroScrolled) return;
    
    const hero = document.getElementById('hero');
    const pageWrapper = document.querySelector('.page-wrapper');
    
    if (hero && pageWrapper) {
        heroScrolled = true;
        
        pageWrapper.classList.add('visible');
        
        setTimeout(() => {
            hero.classList.add('hidden');
            setTimeout(() => {
                hero.style.display = 'none';
            }, 500);
        }, 1000);
        
        setTimeout(() => {
            document.body.classList.remove('no-scroll');
            document.body.style.overflow = '';
        }, 1000);
    }
}

let currentChurchSlide = 0;
let churchSlides = [];
let totalChurchSlides = 0;
let churchArrowLeft = null;
let churchArrowRight = null;
let churchMaps = {};

let currentMuseumSlide = 0;
let museumSlides = [];
let totalMuseumSlides = 0;
let museumArrowLeft = null;
let museumArrowRight = null;
let museumMaps = {};

let currentTheaterSlide = 0;
let theaterSlides = [];
let totalTheaterSlides = 0;
let theaterArrowLeft = null;
let theaterArrowRight = null;
let theaterMaps = {};

let currentRealMuseumSlide = 0;
let realMuseumSlides = [];
let totalRealMuseumSlides = 0;
let realMuseumArrowLeft = null;
let realMuseumArrowRight = null;
let realMuseumMaps = {};

let currentOtherSlide = 0;
let otherSlides = [];
let totalOtherSlides = 0;
let otherArrowLeft = null;
let otherArrowRight = null;
let otherMaps = {};

let currentGeoSlide = 0;
let geoSlides = [];
let totalGeoSlides = 0;
let geoArrowLeft = null;
let geoArrowRight = null;
let geoMaps = {};

function nextSlide() {
    if (currentChurchSlide < totalChurchSlides - 1) {
        churchSlides[currentChurchSlide].classList.remove('active');
        churchSlides[currentChurchSlide].classList.add('prev');
        currentChurchSlide++;
        churchSlides[currentChurchSlide].classList.remove('next');
        churchSlides[currentChurchSlide].classList.add('active');
        updateChurchArrows();
        setTimeout(() => updateCurrentChurchMap(), 300);
    }
}

function prevSlide() {
    if (currentChurchSlide > 0) {
        churchSlides[currentChurchSlide].classList.remove('active');
        churchSlides[currentChurchSlide].classList.add('next');
        currentChurchSlide--;
        churchSlides[currentChurchSlide].classList.remove('prev');
        churchSlides[currentChurchSlide].classList.add('active');
        updateChurchArrows();
        setTimeout(() => updateCurrentChurchMap(), 300);
    }
}

function updateChurchArrows() {
    if (churchArrowLeft) {
        churchArrowLeft.style.opacity = currentChurchSlide > 0 ? '1' : '0';
        churchArrowLeft.style.pointerEvents = currentChurchSlide > 0 ? 'all' : 'none';
    }
    if (churchArrowRight) {
        if (currentChurchSlide >= totalChurchSlides - 1) {
            churchArrowRight.style.opacity = '0';
            churchArrowRight.style.pointerEvents = 'none';
            churchArrowRight.classList.add('hidden');
        } else {
            churchArrowRight.style.opacity = '1';
            churchArrowRight.style.pointerEvents = 'all';
            churchArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentChurchMap() {
    const mapNames = ['alexander', 'radonezh', 'kronstadt', 'kazan', 'allsaints', 'george', 'john', 'vladimir', 'transfiguration'];
    const currentMapName = mapNames[currentChurchSlide];
    if (churchMaps[currentMapName]) {
        setTimeout(() => churchMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function nextMuseumSlide(direction) {
    if (direction === 'next' && currentMuseumSlide < totalMuseumSlides - 1) {
        museumSlides[currentMuseumSlide].classList.remove('active');
        museumSlides[currentMuseumSlide].classList.add('prev');
        currentMuseumSlide++;
        museumSlides[currentMuseumSlide].classList.remove('next');
        museumSlides[currentMuseumSlide].classList.add('active');
        updateMuseumArrows();
        setTimeout(() => updateCurrentMuseumMap(), 300);
    } else if (direction === 'prev' && currentMuseumSlide > 0) {
        museumSlides[currentMuseumSlide].classList.remove('active');
        museumSlides[currentMuseumSlide].classList.add('next');
        currentMuseumSlide--;
        museumSlides[currentMuseumSlide].classList.remove('prev');
        museumSlides[currentMuseumSlide].classList.add('active');
        updateMuseumArrows();
        setTimeout(() => updateCurrentMuseumMap(), 300);
    }
}

function updateMuseumArrows() {
    if (museumArrowLeft) {
        museumArrowLeft.style.opacity = currentMuseumSlide > 0 ? '1' : '0';
        museumArrowLeft.style.pointerEvents = currentMuseumSlide > 0 ? 'all' : 'none';
    }
    if (museumArrowRight) {
        if (currentMuseumSlide >= totalMuseumSlides - 1) {
            museumArrowRight.style.opacity = '0';
            museumArrowRight.style.pointerEvents = 'none';
            museumArrowRight.classList.add('hidden');
        } else {
            museumArrowRight.style.opacity = '1';
            museumArrowRight.style.pointerEvents = 'all';
            museumArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentMuseumMap() {
    const mapNames = ['melnitsa', 'pavlov', 'lenin', 'gasitel', 'elevator', 'mamaev', 'alley'];
    const currentMapName = mapNames[currentMuseumSlide];
    if (museumMaps[currentMapName]) {
        setTimeout(() => museumMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function nextTheaterSlide(direction) {
    if (direction === 'next' && currentTheaterSlide < totalTheaterSlides - 1) {
        theaterSlides[currentTheaterSlide].classList.remove('active');
        theaterSlides[currentTheaterSlide].classList.add('prev');
        currentTheaterSlide++;
        theaterSlides[currentTheaterSlide].classList.remove('next');
        theaterSlides[currentTheaterSlide].classList.add('active');
        updateTheaterArrows();
        setTimeout(() => updateCurrentTheaterMap(), 300);
    } else if (direction === 'prev' && currentTheaterSlide > 0) {
        theaterSlides[currentTheaterSlide].classList.remove('active');
        theaterSlides[currentTheaterSlide].classList.add('next');
        currentTheaterSlide--;
        theaterSlides[currentTheaterSlide].classList.remove('prev');
        theaterSlides[currentTheaterSlide].classList.add('active');
        updateTheaterArrows();
        setTimeout(() => updateCurrentTheaterMap(), 300);
    }
}

function updateTheaterArrows() {
    if (theaterArrowLeft) {
        theaterArrowLeft.style.opacity = currentTheaterSlide > 0 ? '1' : '0';
        theaterArrowLeft.style.pointerEvents = currentTheaterSlide > 0 ? 'all' : 'none';
    }
    if (theaterArrowRight) {
        if (currentTheaterSlide >= totalTheaterSlides - 1) {
            theaterArrowRight.style.opacity = '0';
            theaterArrowRight.style.pointerEvents = 'none';
            theaterArrowRight.classList.add('hidden');
        } else {
            theaterArrowRight.style.opacity = '1';
            theaterArrowRight.style.pointerEvents = 'all';
            theaterArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentTheaterMap() {
    const mapNames = ['puppet', 'youth', 'cossack', 'opera', 'musical'];
    const currentMapName = mapNames[currentTheaterSlide];
    if (theaterMaps[currentMapName]) {
        setTimeout(() => theaterMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function nextRealMuseumSlide(direction) {
    if (direction === 'next' && currentRealMuseumSlide < totalRealMuseumSlides - 1) {
        realMuseumSlides[currentRealMuseumSlide].classList.remove('active');
        realMuseumSlides[currentRealMuseumSlide].classList.add('prev');
        currentRealMuseumSlide++;
        realMuseumSlides[currentRealMuseumSlide].classList.remove('next');
        realMuseumSlides[currentRealMuseumSlide].classList.add('active');
        updateRealMuseumArrows();
        setTimeout(() => updateCurrentRealMuseumMap(), 300);
    } else if (direction === 'prev' && currentRealMuseumSlide > 0) {
        realMuseumSlides[currentRealMuseumSlide].classList.remove('active');
        realMuseumSlides[currentRealMuseumSlide].classList.add('next');
        currentRealMuseumSlide--;
        realMuseumSlides[currentRealMuseumSlide].classList.remove('prev');
        realMuseumSlides[currentRealMuseumSlide].classList.add('active');
        updateRealMuseumArrows();
        setTimeout(() => updateCurrentRealMuseumMap(), 300);
    }
}

function updateRealMuseumArrows() {
    if (realMuseumArrowLeft) {
        realMuseumArrowLeft.style.opacity = currentRealMuseumSlide > 0 ? '1' : '0';
        realMuseumArrowLeft.style.pointerEvents = currentRealMuseumSlide > 0 ? 'all' : 'none';
    }
    if (realMuseumArrowRight) {
        if (currentRealMuseumSlide >= totalRealMuseumSlides - 1) {
            realMuseumArrowRight.style.opacity = '0';
            realMuseumArrowRight.style.pointerEvents = 'none';
            realMuseumArrowRight.classList.add('hidden');
        } else {
            realMuseumArrowRight.style.opacity = '1';
            realMuseumArrowRight.style.pointerEvents = 'all';
            realMuseumArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentRealMuseumMap() {
    const mapNames = ['battle', 'russia', 'regional', 'memorial', 'planetarium'];
    const currentMapName = mapNames[currentRealMuseumSlide];
    if (realMuseumMaps[currentMapName]) {
        setTimeout(() => realMuseumMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function nextOtherSlide(direction) {
    if (direction === 'next' && currentOtherSlide < totalOtherSlides - 1) {
        otherSlides[currentOtherSlide].classList.remove('active');
        otherSlides[currentOtherSlide].classList.add('prev');
        currentOtherSlide++;
        otherSlides[currentOtherSlide].classList.remove('next');
        otherSlides[currentOtherSlide].classList.add('active');
        updateOtherArrows();
        setTimeout(() => updateCurrentOtherMap(), 300);
    } else if (direction === 'prev' && currentOtherSlide > 0) {
        otherSlides[currentOtherSlide].classList.remove('active');
        otherSlides[currentOtherSlide].classList.add('next');
        currentOtherSlide--;
        otherSlides[currentOtherSlide].classList.remove('prev');
        otherSlides[currentOtherSlide].classList.add('active');
        updateOtherArrows();
        setTimeout(() => updateCurrentOtherMap(), 300);
    }
}

function updateOtherArrows() {
    if (otherArrowLeft) {
        otherArrowLeft.style.opacity = currentOtherSlide > 0 ? '1' : '0';
        otherArrowLeft.style.pointerEvents = currentOtherSlide > 0 ? 'all' : 'none';
    }
    if (otherArrowRight) {
        if (currentOtherSlide >= totalOtherSlides - 1) {
            otherArrowRight.style.opacity = '0';
            otherArrowRight.style.pointerEvents = 'none';
            otherArrowRight.classList.add('hidden');
        } else {
            otherArrowRight.style.opacity = '1';
            otherArrowRight.style.pointerEvents = 'all';
            otherArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentOtherMap() {
    const mapNames = ['fountain-art', 'fire-tower', 'train-station', 'metrotram'];
    const currentMapName = mapNames[currentOtherSlide];
    if (otherMaps[currentMapName]) {
        setTimeout(() => otherMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function nextGeoSlide(direction) {
    if (direction === 'next' && currentGeoSlide < totalGeoSlides - 1) {
        geoSlides[currentGeoSlide].classList.remove('active');
        geoSlides[currentGeoSlide].classList.add('prev');
        currentGeoSlide++;
        geoSlides[currentGeoSlide].classList.remove('next');
        geoSlides[currentGeoSlide].classList.add('active');
        updateGeoArrows();
        setTimeout(() => updateCurrentGeoMap(), 300);
    } else if (direction === 'prev' && currentGeoSlide > 0) {
        geoSlides[currentGeoSlide].classList.remove('active');
        geoSlides[currentGeoSlide].classList.add('next');
        currentGeoSlide--;
        geoSlides[currentGeoSlide].classList.remove('prev');
        geoSlides[currentGeoSlide].classList.add('active');
        updateGeoArrows();
        setTimeout(() => updateCurrentGeoMap(), 300);
    }
}

function updateGeoArrows() {
    if (geoArrowLeft) {
        geoArrowLeft.style.opacity = currentGeoSlide > 0 ? '1' : '0';
        geoArrowLeft.style.pointerEvents = currentGeoSlide > 0 ? 'all' : 'none';
    }
    if (geoArrowRight) {
        if (currentGeoSlide >= totalGeoSlides - 1) {
            geoArrowRight.style.opacity = '0';
            geoArrowRight.style.pointerEvents = 'none';
            geoArrowRight.classList.add('hidden');
        } else {
            geoArrowRight.style.opacity = '1';
            geoArrowRight.style.pointerEvents = 'all';
            geoArrowRight.classList.remove('hidden');
        }
    }
}

function updateCurrentGeoMap() {
    const mapNames = ['volga-don', 'ges', 'river-station', 'embankment', 'dancing-bridge'];
    const currentMapName = mapNames[currentGeoSlide];
    if (geoMaps[currentMapName]) {
        setTimeout(() => geoMaps[currentMapName].container.fitToViewport(), 200);
    }
}

function initChurchMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const configs = [
        ['map-alexander', [48.70946, 44.51356]],
        ['map-radonezh', [48.718864, 44.521339]],
        ['map-kronstadt', [48.769750, 44.54030]],
        ['map-kazan', [48.699167, 44.484167]],
        ['map-allsaints', [48.740547, 44.536769]],
        ['map-george', [48.762494, 44.564525]],
        ['map-john', [48.701375, 44.514794]],
        ['map-vladimir', [48.627189, 44.439525]],
        ['map-transfiguration', [48.757494, 44.511855]]
    ];
    
    configs.forEach(([id, coords]) => {
        const container = document.getElementById(id);
        if (!container) return;
        try {
            const map = new ymaps.Map(id, {
                center: coords,
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            map.behaviors.disable('scrollZoom');
            map.behaviors.disable('drag');
            map.behaviors.disable('dblClickZoom');
            churchMaps[id.replace('map-', '')] = map;
        } catch (e) {
            console.error('Church map error:', id, e);
        }
    });
    
    setTimeout(() => {
        Object.values(churchMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

function initMuseumMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const melnitsaContainer = document.getElementById('map-melnitsa');
    if (melnitsaContainer) {
        try {
            const melnitsaMap = new ymaps.Map('map-melnitsa', {
                center: [48.715518, 44.532997],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            melnitsaMap.behaviors.disable('scrollZoom');
            melnitsaMap.behaviors.disable('drag');
            melnitsaMap.behaviors.disable('dblClickZoom');
            museumMaps.melnitsa = melnitsaMap;
        } catch (e) { console.error('Monument map error: map-melnitsa', e); }
    }
    
    const pavlovContainer = document.getElementById('map-pavlov');
    if (pavlovContainer) {
        try {
            const pavlovMap = new ymaps.Map('map-pavlov', {
                center: [48.716111, 44.531667],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            pavlovMap.behaviors.disable('scrollZoom');
            pavlovMap.behaviors.disable('drag');
            pavlovMap.behaviors.disable('dblClickZoom');
            museumMaps.pavlov = pavlovMap;
        } catch (e) { console.error('Monument map error: map-pavlov', e); }
    }
    
    const leninContainer = document.getElementById('map-lenin');
    if (leninContainer) {
        try {
            const leninMap = new ymaps.Map('map-lenin', {
                center: [48.527664, 44.558917],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            leninMap.behaviors.disable('scrollZoom');
            leninMap.behaviors.disable('drag');
            leninMap.behaviors.disable('dblClickZoom');
            museumMaps.lenin = leninMap;
        } catch (e) { console.error('Monument map error: map-lenin', e); }
    }
    
    const gasitelContainer = document.getElementById('map-gasitel');
    if (gasitelContainer) {
        try {
            const gasitelMap = new ymaps.Map('map-gasitel', {
                center: [48.697598, 44.512922],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            gasitelMap.behaviors.disable('scrollZoom');
            gasitelMap.behaviors.disable('drag');
            gasitelMap.behaviors.disable('dblClickZoom');
            museumMaps.gasitel = gasitelMap;
        } catch (e) { console.error('Monument map error: map-gasitel', e); }
    }
    
    const elevatorContainer = document.getElementById('map-elevator');
    if (elevatorContainer) {
        try {
            const elevatorMap = new ymaps.Map('map-elevator', {
                center: [48.687953, 44.480055],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            elevatorMap.behaviors.disable('scrollZoom');
            elevatorMap.behaviors.disable('drag');
            elevatorMap.behaviors.disable('dblClickZoom');
            museumMaps.elevator = elevatorMap;
        } catch (e) { console.error('Monument map error: map-elevator', e); }
    }
    
    const mamaevContainer = document.getElementById('map-mamaev');
    if (mamaevContainer) {
        try {
            const mamaevMap = new ymaps.Map('map-mamaev', {
                center: [48.742222, 44.536944],
                zoom: 16,
                controls: ['zoomControl'],
                behaviors: []
            });
            mamaevMap.behaviors.disable('scrollZoom');
            mamaevMap.behaviors.disable('drag');
            mamaevMap.behaviors.disable('dblClickZoom');
            museumMaps.mamaev = mamaevMap;
        } catch (e) { console.error('Monument map error: map-mamaev', e); }
    }
    
    const alleyContainer = document.getElementById('map-alley');
    if (alleyContainer) {
        try {
            const alleyMap = new ymaps.Map('map-alley', {
                center: [48.705926, 44.518610],
                zoom: 16,
                controls: ['zoomControl'],
                behaviors: []
            });
            alleyMap.behaviors.disable('scrollZoom');
            alleyMap.behaviors.disable('drag');
            alleyMap.behaviors.disable('dblClickZoom');
            museumMaps.alley = alleyMap;
        } catch (e) { console.error('Monument map error: map-alley', e); }
    }
    
    setTimeout(() => {
        Object.values(museumMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

function initTheaterMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const puppetContainer = document.getElementById('map-puppet');
    if (puppetContainer) {
        try {
            const puppetMap = new ymaps.Map('map-puppet', {
                center: [48.707870, 44.507282],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            puppetMap.behaviors.disable('scrollZoom');
            puppetMap.behaviors.disable('drag');
            puppetMap.behaviors.disable('dblClickZoom');
            theaterMaps.puppet = puppetMap;
        } catch (e) { console.error('Theater map error: map-puppet', e); }
    }
    
    const youthContainer = document.getElementById('map-youth');
    if (youthContainer) {
        try {
            const youthMap = new ymaps.Map('map-youth', {
                center: [48.690798, 44.488382],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            youthMap.behaviors.disable('scrollZoom');
            youthMap.behaviors.disable('drag');
            youthMap.behaviors.disable('dblClickZoom');
            theaterMaps.youth = youthMap;
        } catch (e) { console.error('Theater map error: map-youth', e); }
    }
    
    const cossackContainer = document.getElementById('map-cossack');
    if (cossackContainer) {
        try {
            const cossackMap = new ymaps.Map('map-cossack', {
                center: [48.694967, 44.497474],
                zoom: 19,
                controls: ['zoomControl'],
                behaviors: []
            });
            cossackMap.behaviors.disable('scrollZoom');
            cossackMap.behaviors.disable('drag');
            cossackMap.behaviors.disable('dblClickZoom');
            theaterMaps.cossack = cossackMap;
        } catch (e) { console.error('Theater map error: map-cossack', e); }
    }
    
    const operaContainer = document.getElementById('map-opera');
    if (operaContainer) {
        try {
            const operaMap = new ymaps.Map('map-opera', {
                center: [48.766522, 44.560049],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            operaMap.behaviors.disable('scrollZoom');
            operaMap.behaviors.disable('drag');
            operaMap.behaviors.disable('dblClickZoom');
            theaterMaps.opera = operaMap;
        } catch (e) { console.error('Theater map error: map-opera', e); }
    }
    
    const musicalContainer = document.getElementById('map-musical');
    if (musicalContainer) {
        try {
            const musicalMap = new ymaps.Map('map-musical', {
                center: [48.705402, 44.522194],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            musicalMap.behaviors.disable('scrollZoom');
            musicalMap.behaviors.disable('drag');
            musicalMap.behaviors.disable('dblClickZoom');
            theaterMaps.musical = musicalMap;
        } catch (e) { console.error('Theater map error: map-musical', e); }
    }
    
    // Финальная подгонка размеров
    setTimeout(() => {
        Object.values(theaterMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

// ========== ИНИЦИАЛИЗАЦИЯ КАРТ МУЗЕЕВ (реальные) ==========

function initRealMuseumMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const battleContainer = document.getElementById('map-museum-battle');
    if (battleContainer) {
        try {
            const battleMap = new ymaps.Map('map-museum-battle', {
                center: [48.715009, 44.532817],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            battleMap.behaviors.disable('scrollZoom');
            battleMap.behaviors.disable('drag');
            battleMap.behaviors.disable('dblClickZoom');
            realMuseumMaps.battle = battleMap;
        } catch (e) { console.error('Real museum map error: map-museum-battle', e); }
    }
    
    const russiaContainer = document.getElementById('map-museum-russia');
    if (russiaContainer) {
        try {
            const russiaMap = new ymaps.Map('map-museum-russia', {
                center: [48.700061, 44.512581],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            russiaMap.behaviors.disable('scrollZoom');
            russiaMap.behaviors.disable('drag');
            russiaMap.behaviors.disable('dblClickZoom');
            realMuseumMaps.russia = russiaMap;
        } catch (e) { console.error('Real museum map error: map-museum-russia', e); }
    }
    
    const regionalContainer = document.getElementById('map-museum-regional');
    if (regionalContainer) {
        try {
            const regionalMap = new ymaps.Map('map-museum-regional', {
                center: [48.704981, 44.512517],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            regionalMap.behaviors.disable('scrollZoom');
            regionalMap.behaviors.disable('drag');
            regionalMap.behaviors.disable('dblClickZoom');
            realMuseumMaps.regional = regionalMap;
        } catch (e) { console.error('Real museum map error: map-museum-regional', e); }
    }
    
    const memorialContainer = document.getElementById('map-museum-memorial');
    if (memorialContainer) {
        try {
            const memorialMap = new ymaps.Map('map-museum-memorial', {
                center: [48.711330, 44.514684],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            memorialMap.behaviors.disable('scrollZoom');
            memorialMap.behaviors.disable('drag');
            memorialMap.behaviors.disable('dblClickZoom');
            realMuseumMaps.memorial = memorialMap;
        } catch (e) { console.error('Real museum map error: map-museum-memorial', e); }
    }
    
    const planetariumContainer = document.getElementById('map-museum-planetarium');
    if (planetariumContainer) {
        try {
            const planetariumMap = new ymaps.Map('map-museum-planetarium', {
                center: [48.714479, 44.524603],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            planetariumMap.behaviors.disable('scrollZoom');
            planetariumMap.behaviors.disable('drag');
            planetariumMap.behaviors.disable('dblClickZoom');
            realMuseumMaps.planetarium = planetariumMap;
        } catch (e) { console.error('Real museum map error: map-museum-planetarium', e); }
    }
    
    setTimeout(() => {
        Object.values(realMuseumMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

function initOtherMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const fountainContainer = document.getElementById('map-fountain-art');
    if (fountainContainer) {
        try {
            const fountainMap = new ymaps.Map('map-fountain-art', {
                center: [48.704622, 44.5205],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            fountainMap.behaviors.disable('scrollZoom');
            fountainMap.behaviors.disable('drag');
            fountainMap.behaviors.disable('dblClickZoom');
            otherMaps['fountain-art'] = fountainMap;
        } catch (e) { console.error('Other map error: map-fountain-art', e); }
    }

    const fireTowerContainer = document.getElementById('map-fire-tower');
    if (fireTowerContainer) {
        try {
            const fireTowerMap = new ymaps.Map('map-fire-tower', {
                center: [48.7098, 44.51],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            fireTowerMap.behaviors.disable('scrollZoom');
            fireTowerMap.behaviors.disable('drag');
            fireTowerMap.behaviors.disable('dblClickZoom');
            otherMaps['fire-tower'] = fireTowerMap;
        } catch (e) { console.error('Other map error: map-fire-tower', e); }
    }

    const stationContainer = document.getElementById('map-train-station');
    if (stationContainer) {
        try {
            const stationMap = new ymaps.Map('map-train-station', {
                center: [48.712555, 44.513508],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            stationMap.behaviors.disable('scrollZoom');
            stationMap.behaviors.disable('drag');
            stationMap.behaviors.disable('dblClickZoom');
            otherMaps['train-station'] = stationMap;
        } catch (e) { console.error('Other map error: map-train-station', e); }
    }

    const metrotramContainer = document.getElementById('map-metrotram');
    if (metrotramContainer) {
        try {
            const metrotramMap = new ymaps.Map('map-metrotram', {
                center: [48.7175, 44.5305],
                zoom: 18,
                controls: ['zoomControl'],
                behaviors: []
            });
            metrotramMap.behaviors.disable('scrollZoom');
            metrotramMap.behaviors.disable('drag');
            metrotramMap.behaviors.disable('dblClickZoom');
            otherMaps.metrotram = metrotramMap;
        } catch (e) { console.error('Other map error: map-metrotram', e); }
    }

    setTimeout(() => {
        Object.values(otherMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

function initGeoMaps() {
    if (typeof ymaps === 'undefined') return;
    
    const volgaDonContainer = document.getElementById('map-volga-don');
    if (volgaDonContainer) {
        try {
            const volgaDonMap = new ymaps.Map('map-volga-don', {
                center: [48.500495, 44.25020],
                zoom: 8,
                controls: ['zoomControl'],
                behaviors: []
            });
            volgaDonMap.behaviors.disable('scrollZoom');
            volgaDonMap.behaviors.disable('drag');
            volgaDonMap.behaviors.disable('dblClickZoom');
            geoMaps['volga-don'] = volgaDonMap;
        } catch (e) { console.error('Geo map error: map-volga-don', e); }
    }
    
    // 2. Волжская ГЭС
    const gesContainer = document.getElementById('map-ges');
    if (gesContainer) {
        try {
            const gesMap = new ymaps.Map('map-ges', {
                center: [48.8261, 44.67207],
                zoom: 15,
                controls: ['zoomControl'],
                behaviors: []
            });
            gesMap.behaviors.disable('scrollZoom');
            gesMap.behaviors.disable('drag');
            gesMap.behaviors.disable('dblClickZoom');
            geoMaps.ges = gesMap;
        } catch (e) { console.error('Geo map error: map-ges', e); }
    }
    
    const riverStationContainer = document.getElementById('map-river-station');
    if (riverStationContainer) {
        try {
            const riverStationMap = new ymaps.Map('map-river-station', {
                center: [48.701056, 44.519381],
                zoom: 17,
                controls: ['zoomControl'],
                behaviors: []
            });
            riverStationMap.behaviors.disable('scrollZoom');
            riverStationMap.behaviors.disable('drag');
            riverStationMap.behaviors.disable('dblClickZoom');
            geoMaps['river-station'] = riverStationMap;
        } catch (e) { console.error('Geo map error: map-river-station', e); }
    }
    
    const embankmentContainer = document.getElementById('map-embankment');
    if (embankmentContainer) {
        try {
            const embankmentMap = new ymaps.Map('map-embankment', {
                center: [48.703668, 44.52181],
                zoom: 16,
                controls: ['zoomControl'],
                behaviors: []
            });
            embankmentMap.behaviors.disable('scrollZoom');
            embankmentMap.behaviors.disable('drag');
            embankmentMap.behaviors.disable('dblClickZoom');
            geoMaps.embankment = embankmentMap;
        } catch (e) { console.error('Geo map error: map-embankment', e); }
    }

    const dancingBridgeContainer = document.getElementById('map-dancing-bridge');
    if (dancingBridgeContainer) {
        try {
            const dancingBridgeMap = new ymaps.Map('map-dancing-bridge', {
                center: [48.721537, 44.550421],
                zoom: 15,
                controls: ['zoomControl'],
                behaviors: []
            });
            dancingBridgeMap.behaviors.disable('scrollZoom');
            dancingBridgeMap.behaviors.disable('drag');
            dancingBridgeMap.behaviors.disable('dblClickZoom');
            geoMaps['dancing-bridge'] = dancingBridgeMap;
        } catch (e) { console.error('Geo map error: map-dancing-bridge', e); }
    }
    
    // Финальная подгонка размеров
    setTimeout(() => {
        Object.values(geoMaps).forEach(m => m?.container.fitToViewport());
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('no-scroll');

    document.addEventListener('keydown', function(e) {
        if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && !heroScrolled) {
            e.preventDefault();
            scrollToContent();
        }
    });

    document.addEventListener('wheel', function(e) {
        if (e.deltaY > 0 && !heroScrolled) {
            e.preventDefault();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollToContent();
            }, 50);
        }
    }, { passive: false });

    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 50 && !heroScrolled) {
            scrollToContent();
        }
    }, { passive: true });

    const churchSlider = document.querySelector('.attraction-section .attractions-slider');
    if (churchSlider) {
        churchSlides = churchSlider.querySelectorAll('.slide');
        totalChurchSlides = churchSlides.length;
        churchArrowLeft = document.querySelector('.attraction-section .slider-arrow-left');
        churchArrowRight = document.querySelector('.attraction-section .slider-arrow-right');
        
        churchSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });
        
        updateChurchArrows();
    }

    const museumSlider = document.querySelector('#museums-section .museums-slider');
    if (museumSlider) {
        museumSlides = museumSlider.querySelectorAll('.slide');
        totalMuseumSlides = museumSlides.length;
        museumArrowLeft = document.querySelector('#museums-section .museum-arrow-left');
        museumArrowRight = document.querySelector('#museums-section .museum-arrow-right');
        
        museumSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });
        
        updateMuseumArrows();
    }
    
    const theaterSlider = document.querySelector('#theaters-section .museums-slider');
    if (theaterSlider) {
        theaterSlides = theaterSlider.querySelectorAll('.slide');
        totalTheaterSlides = theaterSlides.length;
        
        theaterArrowLeft = document.querySelector('#theaters-section .museum-arrow-left.theater-arrow');
        theaterArrowRight = document.querySelector('#theaters-section .museum-arrow-right.theater-arrow');
        
        theaterSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });
        
        updateTheaterArrows();
    }
    
    const realMuseumSlider = document.querySelector('#real-museums-section .museums-slider');
    if (realMuseumSlider) {
        realMuseumSlides = realMuseumSlider.querySelectorAll('.slide');
        totalRealMuseumSlides = realMuseumSlides.length;
        
        realMuseumArrowLeft = document.querySelector('#real-museums-section .real-museum-arrow-left.real-museum-arrow');
        realMuseumArrowRight = document.querySelector('#real-museums-section .real-museum-arrow-right.real-museum-arrow');
        
        realMuseumSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });
        
        updateRealMuseumArrows();   
    }
    
    // === ДРУГИЕ ДОСТОПРИМЕЧАТЕЛЬНОСТИ: Инициализация слайдера ===
    const otherSlider = document.querySelector('#other-section .museums-slider');
    if (otherSlider) {
        otherSlides = otherSlider.querySelectorAll('.slide');
        totalOtherSlides = otherSlides.length;
        otherArrowLeft = document.querySelector('#other-section .other-arrow-left.other-arrow');
        otherArrowRight = document.querySelector('#other-section .other-arrow-right.other-arrow');
        
        otherSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });

        updateOtherArrows();
    }

    const geoSlider = document.querySelector('#geo-section .museums-slider');
    if (geoSlider) {
        geoSlides = geoSlider.querySelectorAll('.slide');
        totalGeoSlides = geoSlides.length;
        geoArrowLeft = document.querySelector('#geo-section .geo-arrow-left.geo-arrow');
        geoArrowRight = document.querySelector('#geo-section .geo-arrow-right.geo-arrow');
        
        geoSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            slide.classList.add(index === 0 ? 'active' : 'next');
        });
        
        updateGeoArrows();
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('section') && urlParams.has('slide')) {
        // Принудительно показываем контент без анимации
        const hero = document.getElementById('hero');
        const pageWrapper = document.querySelector('.page-wrapper');
        
        if (hero) {
            hero.style.display = 'none';
            hero.classList.add('hidden');
        }
        if (pageWrapper) {
            pageWrapper.classList.add('visible');
            pageWrapper.style.position = 'relative';
            pageWrapper.style.transform = 'none';
        }
        
        // Разрешаем скролл
        document.body.classList.remove('no-scroll');
        document.body.style.overflow = '';
        heroScrolled = true;

    }
    
    // === Инициализация карт с задержкой ===
    setTimeout(() => {
        initChurchMaps();
        initMuseumMaps();
        initTheaterMaps();
        initRealMuseumMaps();
        initOtherMaps();
        initGeoMaps();
        scrollToTargetSection();
    }, 400);
});
// ========== ПЛАВНАЯ ПРОКРУТКА К ЦЕЛЕВОЙ СЕКЦИИ ==========

function scrollToTargetSection() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetSection = urlParams.get('section');
    const targetSlide = parseInt(urlParams.get('slide'));
    const targetCategory = urlParams.get('category');
    
    if (!targetSection || targetSlide === null) return;
    
    // Находим секцию
    const section = document.getElementById(targetSection) || document.querySelector(`.${targetSection}`);
    if (!section) return;
    
    // Плавная прокрутка к секции
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Если это слайдер — переключаем на нужный слайд
    if (targetCategory && !isNaN(targetSlide)) {
        setTimeout(() => {
            switch(targetSection) {
                case 'attraction-section':
                    switchChurchSlide(targetSlide);
                    break;
                case 'museums-section':
                    switchMuseumSlide(targetSlide);
                    break;
                case 'theaters-section':
                    switchTheaterSlide(targetSlide);
                    break;
                case 'real-museums-section':
                    switchRealMuseumSlide(targetSlide);
                    break;
                case 'other-section':
                    switchOtherSlide(targetSlide);
                    break;
                case 'geo-section':
                    switchGeoSlide(targetSlide);
                    break;
            }
        }, 600);
    }
    
    // Очищаем URL от параметров
    setTimeout(() => {
        history.replaceState(null, null, window.location.pathname);
    }, 1000);
}

function switchChurchSlide(index) {
    if (index < 0 || index >= totalChurchSlides || !churchSlides[index]) return;
    churchSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentChurchSlide = index;
    updateChurchArrows();
    setTimeout(() => updateCurrentChurchMap(), 300);
}

function switchMuseumSlide(index) {
    if (index < 0 || index >= totalMuseumSlides || !museumSlides[index]) return;
    museumSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentMuseumSlide = index;
    updateMuseumArrows();
    setTimeout(() => updateCurrentMuseumMap(), 300);
}

function switchTheaterSlide(index) {
    if (index < 0 || index >= totalTheaterSlides || !theaterSlides[index]) return;
    theaterSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentTheaterSlide = index;
    updateTheaterArrows();
    setTimeout(() => updateCurrentTheaterMap(), 300);
}

function switchRealMuseumSlide(index) {
    if (index < 0 || index >= totalRealMuseumSlides || !realMuseumSlides[index]) return;
    realMuseumSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentRealMuseumSlide = index;
    updateRealMuseumArrows();
    setTimeout(() => updateCurrentRealMuseumMap(), 300);
}

function switchOtherSlide(index) {
    if (index < 0 || index >= totalOtherSlides || !otherSlides[index]) return;
    otherSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentOtherSlide = index;
    updateOtherArrows();
    setTimeout(() => updateCurrentOtherMap(), 300);
}

function switchGeoSlide(index) {
    if (index < 0 || index >= totalGeoSlides || !geoSlides[index]) return;
    geoSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) slide.classList.add('active');
        else if (i < index) slide.classList.add('prev');
        else slide.classList.add('next');
    });
    currentGeoSlide = index;
    updateGeoArrows();
    setTimeout(() => updateCurrentGeoMap(), 300);
}