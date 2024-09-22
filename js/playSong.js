document.addEventListener('DOMContentLoaded', () => {
    const currentSongContainer = document.querySelector('.fixed.inset-x-0.bottom-0');
    const currentSongImage = document.getElementById('current-song-image');
    const currentSongTitle = document.getElementById('current-song-title');
    const audioProgress = document.getElementById('progress-bar');
    const playPauseButton = document.getElementById('play-pause-button');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button'); 

    let currentAudio = null;
    let currentIndex = 0;
    let tracks = []; // Array of tracks

    // Function to play the track
    function playTrack(track) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(`https://${track.audio_url}`);
        currentSongImage.src = `https://${track.image_url}`;
        currentSongTitle.textContent = track.name;

        currentAudio.play();
        playPauseButton.classList.replace('fa-play', 'fa-pause'); // change the icon to pause

        currentAudio.addEventListener('timeupdate', () => {
            const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
            audioProgress.style.width = `${progressPercent}%`;
        });

        currentAudio.addEventListener('ended', () => {
            audioProgress.style.width = '0%';
            playPauseButton.classList.replace('fa-pause', 'fa-play'); // change the icon to play
        });
    }

    // Listen to custom event from containersMusic.js
    document.addEventListener('playTrack', (event) => {
        tracks = event.detail.tracks;
        currentIndex = event.detail.index; 
        playTrack(tracks[currentIndex]);
    });

    // Function to play the previous track
    function previousTrack() {
        if (currentIndex > 0) {
            currentIndex--;
            playTrack(tracks[currentIndex]);
        }
    }

    // Function to play the next track
    function nextTrack() {
        if (currentIndex < tracks.length - 1) {
            currentIndex++;
            playTrack(tracks[currentIndex]);
        }
    }

    // Control the play/pause button
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

    // Listen to the previous and next buttons
    previousButton.addEventListener('click', previousTrack);
    nextButton.addEventListener('click', nextTrack);
});