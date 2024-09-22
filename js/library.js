document.addEventListener('DOMContentLoaded', async () => {
    const musicContainer = document.getElementById('songLibraryContainer');
    const videosContainer = document.getElementById('videoLibraryContainer');

    try {
        // Fetch the media data from the backend
        const response = await fetch('https://di-ms-streaming-backend.vercel.app/get-media');
        const mediaData = await response.json();

        // Clear the containers before displaying new media
        musicContainer.innerHTML = '';
        videosContainer.innerHTML = '';

        const tracks = mediaData.filter(media => media.audio_url && media.audio_url.endsWith('.mp3'));
        tracks.forEach((media, index) => {
            const { name, image_url, audio_url } = media;

            // Create the media item container
            const mediaItem = document.createElement('div');
            mediaItem.className = 'flex items-center mb-4 p-2 bg-color-principal rounded-lg mr-1';

            // Image element for the media item
            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg'; // Default image if null
            img.alt = name;
            img.className = 'w-12 h-12 rounded-full mr-4'


            // Text container for the media name
            const textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col';

            // Media name element
            const nameElement = document.createElement('p');
            nameElement.className = 'text-sm text-white font-bold';
            nameElement.textContent = name;

            textContainer.appendChild(nameElement);

            // Play button
            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'ml-auto';

            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center ml-10';
            playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;

            playButton.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('playTrack', {
                    detail: {
                        tracks,
                        index,
                    }
                }));
                // Call the function that updates the history
                updateHistory(name, image_url, audio_url, 'video');
            });

            playButtonContainer.appendChild(playButton);

            // Append elements to the media item
            mediaItem.appendChild(img);
            mediaItem.appendChild(textContainer);
            mediaItem.appendChild(playButtonContainer);

            // Append the media item to the music container
            musicContainer.appendChild(mediaItem);

        });
        
        const videos = mediaData.filter(media => media.audio_url && media.audio_url.endsWith('.mp4'));
        videos.forEach(media => {
            const { name, image_url, audio_url } = media;

            // Create the media item container
            const mediaItem = document.createElement('div');
            mediaItem.className = 'flex items-center mb-4 p-2 bg-color-principal rounded-lg mr-1';

            // Image element for the media item
            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg'; // Default image if null
            img.alt = name;
            img.className = 'w-12 h-12 rounded-md mr-4'

            

            // Text container for the media name
            const textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col';

            // Media name element
            const nameElement = document.createElement('p');
            nameElement.className = 'text-sm text-white font-bold';
            nameElement.textContent = name;

            textContainer.appendChild(nameElement);

            // Play button
            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'ml-auto';

            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center ml-10';
            playButton.innerHTML = `<i class="fa fa-play text-color-principal"></i>`;

            

            playButtonContainer.appendChild(playButton);

            // Append elements to the media item
            mediaItem.appendChild(img);
            mediaItem.appendChild(textContainer);
            mediaItem.appendChild(playButtonContainer);

           
                
            //} else if (audio_url && audio_url.endsWith('.mp4')) {
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
                // Append the media item to the video container
            videosContainer.appendChild(mediaItem);
        //}
        });
    } catch (error) {
        console.error('Error getting data from backend', error);
        alert('There was an error loading the content.');
    }

    // Declara la variable playbackHistory fuera de la función
    let playbackHistory = [];

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

        // Add the history item at the beginning of the playbackHistory array
        playbackHistory.unshift(historyItem);

        // Limit the playbackHistory to 8 items
        if (playbackHistory.length > 8) {
            const firstItem = playbackHistory.pop(); // Remove the last item from the array
            firstItem.remove(); // Remove from the DOM
        }
    }


    
});
