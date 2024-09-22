document.addEventListener('DOMContentLoaded', async () => {
    const musicContainer = document.getElementById('musicContainer');
    const videosContainer = document.getElementById('videosContainer');
    const historyContainer = document.getElementById('historyContainer'); 

    // Array of history items
    let history = [];

    try {
        const response = await fetch('http://localhost:5000/get-media');
        const mediaData = await response.json();

        musicContainer.innerHTML = '';
        videosContainer.innerHTML = '';

        // Filter the tracks from audio_url ending with .mp3
        const tracks = mediaData.filter(media => media.audio_url && media.audio_url.endsWith('.mp3'));

        tracks.forEach((media, index) => {
            const { name, image_url, audio_url } = media;

            const mediaItem = document.createElement('div');
            mediaItem.className = 'relative w-32 h-32 flex-shrink-0 group';

            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg';
            img.className = 'w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-75';
            img.alt = name;

            const overlay = document.createElement('div');
            overlay.className = 'absolute bottom-0 left-0 w-full bg-color-principal bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
            overlay.innerHTML = `<p class="text-xs">${name}</p>`;

            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300';

            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
            playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;

            playButton.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('playTrack', {
                    detail: {
                        tracks,
                        index,
                    }
                }));

                // call the function that updates the history
                updateHistory(name, image_url, audio_url, 'audio');
            });

            
            playButtonContainer.appendChild(playButton);
            mediaItem.appendChild(img);
            mediaItem.appendChild(overlay);
            mediaItem.appendChild(playButtonContainer);

            // Append the media item to the music container
            musicContainer.appendChild(mediaItem);
        });

        // Filter the videos from audio_url ending with .mp4
        const videos = mediaData.filter(media => media.audio_url && media.audio_url.endsWith('.mp4'));
        videos.forEach(media => {
            const { name, image_url, audio_url } = media;

            const mediaItem = document.createElement('div');
            mediaItem.className = 'relative w-32 h-32 flex-shrink-0 group z-20 mb-10';

            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg';
            img.className = 'w-full h-full object-cover rounded-lg transition duration-300 group-hover:brightness-75';
            img.alt = name;

            const overlay = document.createElement('div');
            overlay.className = 'absolute bottom-0 left-0 w-full bg-color-principal bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
            overlay.innerHTML = `<p class="text-xs">${name}</p>`;

            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300';

            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
            playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;

            playButton.addEventListener('click', () => {
                // Pausar la canción si se está reproduciendo
                document.dispatchEvent(new CustomEvent('stopTrack'));
                // Create popup container
                const popupContainer = document.createElement('div');
                popupContainer.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';

                // Create video element
                const video = document.createElement('video');
                video.src = `https://${audio_url}`;
                video.controls = true;
                video.className = 'w-3/4 h-3/4 rounded-lg';

                // Create close button
                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-4 right-4 text-white text-2xl';
                closeButton.innerHTML = `<i class="fas fa-times"></i>`;

                // Handle closing the video
                closeButton.addEventListener('click', () => {
                    video.pause();
                    popupContainer.remove(); // Remove the popup container
                });

                // Append video and close button to the popup container
                popupContainer.appendChild(video);
                popupContainer.appendChild(closeButton);

                // Append popup container to the body
                document.body.appendChild(popupContainer);

                // Call the function that updates the history
                updateHistory(name, image_url, audio_url, 'video');
            });

            // Append elements to the video item
            playButtonContainer.appendChild(playButton);
            mediaItem.appendChild(img);
            mediaItem.appendChild(overlay);
            mediaItem.appendChild(playButtonContainer);

            // Append the media item to the video container
            videosContainer.appendChild(mediaItem);
        });

    } catch (error) {
        console.error('Error getting data from backend', error);
        alert('There was an error loading the content.');
    }

    // Function to update the history
    function updateHistory(name, image_url, audio_url, type) {
        // Create history item
        const historyItem = document.createElement('div');
        historyItem.className = 'relative w-32 h-32 flex-shrink-0 group';
    
        const img = document.createElement('img');
        img.src = image_url ? `https://${image_url}` : 'img/default.jpg';
    
        // Apply rounded-full for audio, rounded-lg for video
        if (type === 'audio') {
            img.className = 'w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-75';
        } else if (type === 'video') {
            img.className = 'w-full h-full object-cover rounded-lg transition duration-300 group-hover:brightness-75';
        }
    
        img.alt = name;
    
        const overlay = document.createElement('div');
        overlay.className = 'absolute bottom-0 left-0 w-full bg-color-principal bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
        overlay.innerHTML = `<p class="text-xs">${name}</p>`;
    
        const playButtonContainer = document.createElement('div');
        playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300';
    
        const playButton = document.createElement('button');
        playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
        playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;
    
        // Event listener to play the history item
        playButton.addEventListener('click', () => {
            if (type === 'audio') {
                document.dispatchEvent(new CustomEvent('playTrack', {
                    detail: {
                        tracks: [{ name, image_url, audio_url }], // Array con un solo track
                        index: 0,
                    }
                }));
            } else if (type === 'video') {
                const popupContainer = document.createElement('div');
                popupContainer.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';
    
                const video = document.createElement('video');
                video.src = `https://${audio_url}`;
                video.controls = true;
                video.className = 'w-3/4 h-3/4 rounded-lg';
    
                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-4 right-4 text-white text-2xl';
                closeButton.innerHTML = `<i class="fas fa-times"></i>`;
    
                closeButton.addEventListener('click', () => {
                    video.pause();
                    popupContainer.remove();
                });
    
                popupContainer.appendChild(video);
                popupContainer.appendChild(closeButton);
                document.body.appendChild(popupContainer);
            }
        });
    
        // Append the button to the history item
        playButtonContainer.appendChild(playButton);
        historyItem.appendChild(img);
        historyItem.appendChild(overlay);
        historyItem.appendChild(playButtonContainer);
    
        // Insert the history item at the beginning of the history container
        historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    
        // Add the history item at the beginning of the history array
        history.unshift(historyItem);
    
        // Limit the history to 8 items
        if (history.length > 8) {
            const firstItem = history.pop(); // Remove the last item from the array
            firstItem.remove(); // Remove from the DOM
        }
    }
    
    
});
