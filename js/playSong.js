document.addEventListener('DOMContentLoaded', () => {
    const currentSongContainer = document.querySelector('.fixed.inset-x-0.bottom-0');
    const currentSongImage = document.getElementById('current-song-image');
    const currentSongTitle = document.getElementById('current-song-title');
    const audioProgress = document.getElementById('progress-bar');
    const playPauseButton = document.getElementById('play-pause-button');
    

    let currentAudio = null;

    // Función para reproducir la pista
    function playTrack(track) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(`https://${track.audio_url}`);
        currentSongImage.src = `https://${track.image_url}`;
        currentSongTitle.textContent = track.name;

        currentAudio.play();
        playPauseButton.classList.replace('fa-play', 'fa-pause'); // Cambia el icono a pausa

        currentAudio.addEventListener('timeupdate', () => {
            const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
            audioProgress.style.width = `${progressPercent}%`;
        });

        currentAudio.addEventListener('ended', () => {
            audioProgress.style.width = '0%';
            playPauseButton.classList.replace('fa-pause', 'fa-play'); // Cambia el icono a play
        });
    }

    // Escucha el evento personalizado desde containersMusic.js
    document.addEventListener('playTrack', (event) => {
        playTrack(event.detail);
    });

    // Controlar Play/Pause
    playPauseButton.addEventListener('click', () => {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
                playPauseButton.classList.replace('fa-play', 'fa-pause');
            } else {
                currentAudio.pause();
                playPauseButton.classList.replace('fa-pause', 'fa-play');
            }
        }
    });
});
