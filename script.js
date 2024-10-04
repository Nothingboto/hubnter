document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('username')) {
        showProfile();
    }
    loadVideos();
});

function signUp() {
    const username = document.getElementById('username').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    if (username) {
        localStorage.setItem('username', username);
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        showProfile();
    }
}

function showProfile() {
    const username = localStorage.getItem('username');
    document.getElementById('profileName').innerText = username;
    document.getElementById('signup').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('feed').style.display = 'block';
    loadLikedVideos();
}

function showUpload() {
    document.getElementById('upload').style.display = 'block';
}

function uploadVideo() {
    const file = document.getElementById('videoFile').files[0];
    const title = document.getElementById('videoTitle').value;
    if (file && title) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const videos = JSON.parse(localStorage.getItem('videos') || '[]');
            videos.push({ title, src: e.target.result });
            localStorage.setItem('videos', JSON.stringify(videos));
            loadVideos();
        };
        reader.readAsDataURL(file);
    }
}

function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    videos.forEach((video, index) => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <h4>${video.title}</h4>
            <video src="${video.src}" controls></video>
            <button onclick="likeVideo(${index})">Like</button>
        `;
        videosContainer.appendChild(videoElement);
    });
}

function likeVideo(index) {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    likedVideos.push(videos[index]);
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
    loadLikedVideos();
}

function loadLikedVideos() {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    const likedVideosContainer = document.getElementById('likedVideos');
    likedVideosContainer.innerHTML = '';
    likedVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <h4>${video.title}</h4>
            <video src="${video.src}" controls></video>
        `;
        likedVideosContainer.appendChild(videoElement);
    });
}
