
document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.playButton');
    const mediaPlayerContainer = document.getElementById('mediaPlayerContainer');
    const mediaContainer = document.getElementById('mediaContainer');
    const closePlayerButton = document.getElementById('closePlayer');

    playButtons.forEach(button => {
        button.addEventListener('click', async () => {
            try {
                // Request the URLs from the backend
                const response = await fetch('http://localhost:5000/get-urls'); 
                const urls = await response.json();

                // Clean the player container before displaying new media
                mediaContainer.innerHTML = '';

                // Load first media (can be modified to load specific content)
                const url = urls[0]; // Change the index if you need another medium
                if (url.endsWith('.mp4')) {
                    const video = document.createElement('video');
                    video.src = url;
                    video.controls = true;
                    video.className = 'w-full h-full rounded-lg';
                    mediaContainer.appendChild(video);
                } else if (url.endsWith('.jpeg') || url.endsWith('.jpg') || url.endsWith('.png')) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.className = 'w-full h-full object-cover rounded-lg';
                    mediaContainer.appendChild(img);
                } else {
                    console.log('Tipo de archivo no reconocido:', url);
                }

                // Show the player
                mediaPlayerContainer.classList.remove('hidden');
            } catch (error) {
                console.error('Error al obtener las URLs:', error);
                alert('Hubo un error al cargar el contenido.');
            }
        });
    });

    // Close the player by pressing the close button
    closePlayerButton.addEventListener('click', () => {
        mediaPlayerContainer.classList.add('hidden');
        mediaContainer.innerHTML = ''; // Clears content when closed
    });
});




