document.addEventListener('DOMContentLoaded', async () => {
    const musicContainer = document.getElementById('musicContainer');
    const currentSongContainer = document.querySelector('.fixed.inset-x-0.bottom-0'); // Ajusta según tu estructura
    const currentSongImage = currentSongContainer.querySelector('img');
    const currentSongTitle = currentSongContainer.querySelector('.font-bold');
    const currentSongSubtitle = currentSongContainer.querySelector('.text-xs');
    const audioProgress = currentSongContainer.querySelector('.bg-teal-400');
    const playPauseButton = currentSongContainer.querySelector('.fa-play');
    
    let currentAudio = null;
    let tracks = []; // Array to almacenar las pistas

    try {
        const response = await fetch('http://localhost:5000/get-media');
        const mediaData = await response.json();

        musicContainer.innerHTML = '';

        mediaData.forEach((media, index) => {
            const { name, image_url, audio_url } = media;

            // Crear elemento para la música
            const mediaItem = document.createElement('div');
            mediaItem.className = 'relative w-32 h-32 flex-shrink-0 group';

            const img = document.createElement('img');
            img.src = `https://${image_url}`;
            img.className = 'w-full h-full object-cover rounded-lg';
            img.alt = name;

            const overlay = document.createElement('div');
            overlay.className = 'absolute bottom-0 left-0 w-full bg-color-principal bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
            overlay.innerHTML = `<p class="text-xs">${name}</p>`;

            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100';
            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
            playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;

            // Agregar listener para reproducir la pista
            playButton.addEventListener('click', () => {
                playTrack(index);
            });

            playButtonContainer.appendChild(playButton);
            mediaItem.appendChild(img);
            mediaItem.appendChild(overlay);
            mediaItem.appendChild(playButtonContainer);
            musicContainer.appendChild(mediaItem);

            // Agregar datos de pista al array
            tracks.push({ name, image_url, audio_url });
        });

        function playTrack(index) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            const track = tracks[index];
            currentAudio = new Audio(`https://${track.audio_url}`); // Asegúrate de que esto esté bien
            currentSongImage.src = `https://${track.image_url}`;
            currentSongTitle.textContent = track.name;

            currentAudio.play();

            currentAudio.addEventListener('timeupdate', () => {
                const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
                audioProgress.style.width = `${progressPercent}%`;
            });

            currentAudio.addEventListener('ended', () => {
                audioProgress.style.width = '0%'; // Reiniciar el progreso cuando termina
            });
        }
    } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
        alert('Hubo un error al cargar el contenido.');
    }
});
