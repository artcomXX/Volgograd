// ========== ПЛЕЕР ВЕГА П-410С (ЦАРИЦЫНЪ) ==========
let audio = new Audio();
let tracks = [];
let currentTrackIndex = 0;
let isPlaying = false;
let volumeSliderVisible = false;

function updateHeaderPlayer() {
    const trackNameEl = document.getElementById('currentTrackDisplay');
    const playIcon = document.querySelector('.icon-play');
    const pauseIcon = document.querySelector('.icon-pause');
    const progressEl = document.getElementById('headerProgress');
    
    if (trackNameEl && tracks[currentTrackIndex]) {
        trackNameEl.textContent = tracks[currentTrackIndex].name;
    }
    
    if (playIcon && pauseIcon) {
        playIcon.style.display = isPlaying ? 'none' : 'block';
        pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }
    
    if (progressEl && audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressEl.style.width = percent + '%';
    }
}

function seekHeader(event) {
    if (!audio.duration) return;
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX || (event.touches?.[0]?.clientX);
    if (!x) return;
    const percent = (x - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, percent)) * audio.duration;
}

function toggleVolumeSlider() {
    const wrapper = document.getElementById('volumeSliderWrapper');
    if (!wrapper) return;
    volumeSliderVisible = !volumeSliderVisible;
    wrapper.classList.toggle('visible', volumeSliderVisible);
    if (volumeSliderVisible) updateVolumeIcon(audio.volume);
}

document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('volumeSliderWrapper');
    const volumeBtn = document.getElementById('volumeBtn');
    if (!wrapper || !volumeBtn) return;
    if (volumeSliderVisible && !wrapper.contains(e.target) && !volumeBtn.contains(e.target)) {
        wrapper.classList.remove('visible');
        volumeSliderVisible = false;
    }
});

function setVolume(value) {
    const vol = value / 100;
    audio.volume = vol;
    updateVolumeIcon(vol);
    audio.dataset.prevVolume = vol.toString();
}

function updateVolumeIcon(volume) {
    const volIcon = document.querySelector('.icon-volume');
    const muteIcon = document.querySelector('.icon-volume-mute');
    if (volIcon && muteIcon) {
        if (volume === 0) {
            volIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    }
}

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];
    audio.src = track.path;
    audio.load();
    
    const trackNameEl = document.getElementById('currentTrackDisplay');
    if (trackNameEl) trackNameEl.textContent = track.name;
    
    const select = document.getElementById('trackSelect');
    if (select) select.value = index;
    
    if (isPlaying) audio.play().catch(e => console.warn('Playback blocked:', e));
    updateHeaderPlayer();
}

function renderTrackSelect() {
    const select = document.getElementById('trackSelect');
    if (!select) return;
    select.innerHTML = '<option value="">Выберите музыкальную композицію</option>';
    tracks.forEach((track, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${index + 1}. ${track.name}`;
        select.appendChild(option);
    });
}

function loadMusicFiles() {
    if (tracks.length > 0) return;
    tracks = [
        { name: 'Прощание Славянки', path: 'whiteMusic/ProchanieSlavianki.mp3' },
        { name: 'Красная Армия Всех Сильней!', path: 'whiteMusic/WhiteArmyBlackBaron.mp3' },
        { name: 'Ойся, ты Ойся', path: 'whiteMusic/OicaTiOica.m4a' },
        { name: 'Эх, Яблочко!', path: 'whiteMusic/ExApple.m4a' },
        // { name: 'Боже, Царя храни!', path: 'tsarMusic/bozhe_tsarya_khrani.mp3' },
        // { name: 'Коль славенъ', path: 'tsarMusic/kol_slaven.mp3' }
    ];
    renderTrackSelect();
    audio.volume = 0.7;
    updateVolumeIcon(0.7);
}

audio.addEventListener('timeupdate', updateHeaderPlayer);
audio.addEventListener('loadedmetadata', updateHeaderPlayer);
audio.addEventListener('ended', () => {
    isPlaying = false;
    updateHeaderPlayer();
    nextTrack();
});
audio.addEventListener('error', (e) => {
    console.error('Ошибка загрузки:', audio.src);
    const el = document.getElementById('currentTrackDisplay');
    if (el) el.textContent = 'Ошибка загрузки';
});

function togglePlay() {
    if (!audio.src && tracks.length > 0) loadTrack(0);
    if (!audio.src) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(e => console.warn('Playback failed:', e));
    isPlaying = !isPlaying;
    updateHeaderPlayer();
}

function nextTrack() {
    if (tracks.length === 0) return;
    const next = (currentTrackIndex + 1) % tracks.length;
    loadTrack(next);
    if (isPlaying) audio.play();
}

function prevTrack() {
    if (tracks.length === 0) return;
    const prev = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prev);
    if (isPlaying) audio.play();
}

function selectTrack(value) {
    if (value !== "" && tracks[value]) {
        loadTrack(parseInt(value));
        if (!isPlaying) togglePlay();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadMusicFiles();
    const slider = document.getElementById('headerVolumeSlider');
    if (slider) {
        slider.value = 70;
        audio.volume = 0.7;
        updateVolumeIcon(0.7);
    }
});