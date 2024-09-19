const imageContainer = document.getElementById('imageContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtnMusic = document.getElementById('prevBtnMusic');
const nextBtnMusic = document.getElementById('nextBtnMusic');
const prevBtnVideos = document.getElementById('prevBtnVideos');
const nextBtnVideos = document.getElementById('nextBtnVideos');

prevBtn.addEventListener('click', () => {
    imageContainer.scrollBy({
        left: -300, 
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    imageContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

prevBtnMusic.addEventListener('click', () => {
    musicContainer.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

nextBtnMusic.addEventListener('click', () => {
    musicContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

prevBtnVideos.addEventListener('click', () => {
    videosContainer.scrollBy({
        left: -300, 
        behavior: 'smooth'
    });
});

nextBtnVideos.addEventListener('click', () => {
    videosContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});