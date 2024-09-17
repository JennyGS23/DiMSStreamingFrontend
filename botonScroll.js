const imageContainer = document.getElementById('imageContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    imageContainer.scrollBy({
        left: -300, // Ajusta el valor según el tamaño de las imágenes
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    imageContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});
