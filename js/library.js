document.addEventListener('DOMContentLoaded', async () => {
    const musicContainer = document.getElementById('songLibraryContainer');
    const videosContainer = document.getElementById('videoLibraryContainer');

    try {
        // Fetch the media data from the backend
        const response = await fetch('http://localhost:5000/get-media');
        const mediaData = await response.json();

        // Clear the containers before displaying new media
        musicContainer.innerHTML = '';
        videosContainer.innerHTML = '';

        // Iterate over each media item to populate the correct container
        mediaData.forEach(media => {
            const { name, image_url, audio_url } = media;

            // Create the media item container
            const mediaItem = document.createElement('div');
            mediaItem.className = 'flex items-center mb-4 p-2 bg-color-principal rounded-lg mr-1';

            // Image element for the media item
            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg'; // Default image if null
            img.alt = name;

            // Apply different styles for music (rounded) and videos (square)
            if (audio_url && audio_url.endsWith('.mp3')) {
                img.className = 'w-12 h-12 rounded-full mr-4'; // Rounded image for songs
            } else if (audio_url && audio_url.endsWith('.mp4')) {
                img.className = 'w-12 h-12 rounded-md mr-4'; // Square image for videos
            }

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

            // Emite un evento personalizado con la información de la pista
            playButton.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('playTrack', {
                    detail: {
                        name,
                        image_url,
                        audio_url,
                    }
                }));
            });

            playButtonContainer.appendChild(playButton);

            // Append elements to the media item
            mediaItem.appendChild(img);
            mediaItem.appendChild(textContainer);
            mediaItem.appendChild(playButtonContainer);

            // Separate media into the correct container based on the URL
            if (audio_url && audio_url.endsWith('.mp3')) {
                // Append the media item to the music container
                musicContainer.appendChild(mediaItem);
            } else if (audio_url && audio_url.endsWith('.mp4')) {
                // Append the media item to the video container
                playButton.addEventListener('click', () => {
                    const video = document.createElement('video');
                    video.src = `https://${audio_url}`;
                    video.controls = true;
                    video.play();
                    videosContainer.appendChild(video);
                });
                videosContainer.appendChild(mediaItem);
            }
        });
    } catch (error) {
        console.error('Error getting data from backend', error);
        alert('There was an error loading the content.');
    }
});
