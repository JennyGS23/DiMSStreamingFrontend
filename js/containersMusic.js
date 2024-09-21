document.addEventListener('DOMContentLoaded', async () => {
    const musicContainer = document.getElementById('musicContainer');
    const videosContainer = document.getElementById('videosContainer');

    try {
        // Fetch the media data from the backend
        const response = await fetch('http://localhost:5000/get-media');
        const mediaData = await response.json();

        // Clear the containers before displaying new media
        musicContainer.innerHTML = '';
        videosContainer.innerHTML = '';

        // Iterate over each media item to populate the correct container
        mediaData.forEach(media => {
            const { name, image_url, audio_url} = media;

            // Create the media item container
            const mediaItem = document.createElement('div');
            mediaItem.className = 'relative w-32 h-32 flex-shrink-0 group';

            // Image element for the media item
            const img = document.createElement('img');
            img.src = image_url ? `https://${image_url}` : 'img/default.jpg'; // Default image if null
            img.className = 'w-full h-full object-cover rounded-lg transition duration-300 group-hover:brightness-75';
            img.alt = name;

            // Overlay with media name
            const overlay = document.createElement('div');
            overlay.className = 'absolute bottom-0 left-0 w-full bg-color-principal bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
            overlay.innerHTML = `<p class="text-xs">${name}</p>`;

            // Container for the play button
            const playButtonContainer = document.createElement('div');
            playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300';

            const playButton = document.createElement('button');
            playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
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

            // Separate media into the correct container based on the URL
            if (audio_url && audio_url.endsWith('.mp3')) {

                // Append elements to the music item
                playButtonContainer.appendChild(playButton);
                mediaItem.appendChild(img);
                mediaItem.appendChild(overlay);
                mediaItem.appendChild(playButtonContainer);

                // Append the media item to the music container
                musicContainer.appendChild(mediaItem);
            } else if (audio_url && audio_url.endsWith('.mp4')) {
                // Handle video items
                playButton.addEventListener('click', () => {
                    const video = document.createElement('video');
                    video.src = `https://${audio_url}`;
                    video.controls = true;
                    video.play();
                    videosContainer.appendChild(video);
                });

                // Append elements to the video item
                playButtonContainer.appendChild(playButton);
                mediaItem.appendChild(img);
                mediaItem.appendChild(overlay);
                mediaItem.appendChild(playButtonContainer);

                // Append the media item to the video container
                videosContainer.appendChild(mediaItem);
            }
        });
    } catch (error) {
        console.error('Error getting data from backend', error);
        alert('There was an error loading the content.');
    }
});
