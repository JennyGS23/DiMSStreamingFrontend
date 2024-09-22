// Function to randomly select a URL and display it in the recommendations section
async function displayRandomRecommendation() {
    try {
        // Fetch media data from the backend
        const response = await fetch('di-ms-streaming-backend.vercel.app/get-media');
        const mediaData = await response.json();

        // Combine all URLs (mp3 and mp4) into a single array
        const allMedia = mediaData.filter(media =>
            (media.audio_url && (media.audio_url.endsWith('.mp3') || media.audio_url.endsWith('.mp4')))
        );

        // Select a random media item
        const randomIndex = Math.floor(Math.random() * allMedia.length);
        const randomMedia = allMedia[randomIndex];

        // Get recommendations container
        const recommendationsContainer = document.getElementById('Recommendations');

        // Clear existing content
        recommendationsContainer.innerHTML = '';

        // Create main container to hold text and recommendation item
        const mainContainer = document.createElement('div');
        mainContainer.className = 'flex items-center bg-gray-800 p-4 rounded-lg shadow-lg';

        // Create a text container for the left-side text
        const textContainer = document.createElement('div');
        textContainer.className = 'text-left pr-4'; // Add some padding to the right
        textContainer.innerHTML = `<p class="text-xs text-white">Discover and enjoy the greatest hits of the moment on your favorite platform. Listen and watch the best, all in one place!</p>`;

        // Create and add elements to display the recommendation
        const recommendationItem = document.createElement('div');
        recommendationItem.className = 'relative w-32 h-32 flex-shrink-0 group';

        const img = document.createElement('img');
        img.src = randomMedia.image_url ? `https://${randomMedia.image_url}` : 'img/default.jpg';
        img.className = 'w-full h-full object-cover rounded-lg transition duration-300 group-hover:brightness-75';
        img.alt = randomMedia.name;

        const overlay = document.createElement('div');
        overlay.className = 'absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-70 text-white p-2 rounded-b-lg text-sm';
        overlay.innerHTML = `<p class="text-xs">${randomMedia.name}</p>`;

        const playButtonContainer = document.createElement('div');
        playButtonContainer.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300';

        const playButton = document.createElement('button');
        playButton.className = 'playButton p-2 bg-white rounded-full shadow-lg flex items-center justify-center';
        playButton.innerHTML = `<i class="fa fa-play text-gray-900"></i>`;

        // Add event listener to play the media on button click
        playButton.addEventListener('click', () => {
            if (randomMedia.audio_url.endsWith('.mp3')) {
                // Dispatch play event for audio
                document.dispatchEvent(new CustomEvent('playTrack', {
                    detail: {
                        tracks: [randomMedia],
                        index: 0,
                    }
                }));
            } else if (randomMedia.audio_url.endsWith('.mp4')) {
                // Create popup container for video playback
                const popupContainer = document.createElement('div');
                popupContainer.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50';

                const video = document.createElement('video');
                video.src = `https://${randomMedia.audio_url}`;
                video.controls = true;
                video.className = 'w-3/4 h-auto rounded-lg';

                const closeButton = document.createElement('button');
                closeButton.className = 'absolute top-4 right-4 text-white text-2xl';
                closeButton.innerHTML = `<i class="fas fa-times"></i>`;

                // Handle closing the video
                closeButton.addEventListener('click', () => {
                    video.pause();
                    popupContainer.remove();
                });

                // Append video and close button to the popup container
                popupContainer.appendChild(video);
                popupContainer.appendChild(closeButton);
                document.body.appendChild(popupContainer);
            }
        });

        // Append elements to the recommendation item
        playButtonContainer.appendChild(playButton);
        recommendationItem.appendChild(img);
        recommendationItem.appendChild(overlay);
        recommendationItem.appendChild(playButtonContainer);

        // Append text container and recommendation item to the main container
        mainContainer.appendChild(textContainer);
        mainContainer.appendChild(recommendationItem);

        // Append the main container to the recommendations container
        recommendationsContainer.appendChild(mainContainer);
    } catch (error) {
        console.error('Error fetching media data:', error);
        alert('Failed to load recommendations.');
    }
}

// Load the random recommendation once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayRandomRecommendation();
});