'use strict'


// Animate game cards with GSAP
gsap.from(".game-card", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Toggle search input visibility
document.getElementById("searchToggle").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.classList.toggle("d-none");
  if (!input.classList.contains("d-none")) {
    input.focus();
  }
});


// For that laptop screen
const videos = [
  "https://www.youtube.com/embed/L_UPHsGR6fM?autoplay=1&mute=1&loop=1&playlist=L_UPHsGR6fM",
  "https://www.youtube.com/embed/SIpyhJGNwGo?autoplay=1&mute=1&loop=1&playlist=SIpyhJGNwGo",
  "https://www.youtube.com/embed/bOEb9eq2vRU?autoplay=1&mute=1&loop=1&playlist=bOEb9eq2vRU"
];



let current = 0;
const iframe = document.querySelector(".screen-content iframe");

setInterval(() => {
  current = (current + 1) % videos.length;
  iframe.src = videos[current];
}, 100); // Change every 10 seconds


// Video track
const mediaSets = {
  track1: [
    { type: 'img', src: 'https://img.youtube.com/vi/L_UPHsGR6fM/maxresdefault.jpg', link: 'https://youtu.be/L_UPHsGR6fM?si=IvDjdGr8qRtLeHme' },

    { type: 'img', src: 'https://img.youtube.com/vi/SIpyhJGNwGo/maxresdefault.jpg', link: 'https://youtu.be/SIpyhJGNwGo?si=GOACwyJYOoaNUK3g' },


    { type: 'img', src: 'https://img.youtube.com/vi/bOEb9eq2vRU/maxresdefault.jpg', link: 'https://youtu.be/bOEb9eq2vRU?si=fDNUyOTq90oirXJv' },

    { type: 'img', src: 'https://img.youtube.com/vi/-YQ2orY4yyg/maxresdefault.jpg', link: 'https://youtu.be/-YQ2orY4yyg?si=tY4gZHVphePh9ZtD' },
    { type: 'img', src: 'https://img.youtube.com/vi/B13xyZeHdlo/maxresdefault.jpg', link: 'https://youtu.be/B13xyZeHdlo?si=4Q4Q0ZRySMpniZyY' }
  ],
  track2: [
    { type: 'img', src: 'https://img.youtube.com/vi/HzvpOtyJYGs/maxresdefault.jpg', link: 'https://youtu.be/HzvpOtyJYGs?si=csfDB4ivLzGb6b7v' },

    { type: 'img', src: 'https://img.youtube.com/vi/UFGQdL0vwmY/maxresdefault.jpg', link: 'https://www.youtube.com/live/UFGQdL0vwmY?si=Olh_b3_WjRNcVKFP' },
    { type: 'img', src: 'https://img.youtube.com/vi/wnNGzMn5csQ/maxresdefault.jpg', link: 'https://youtu.be/wnNGzMn5csQ?si=MD7EMHa82CsRSn2k' },

    { type: 'img', src: 'https://img.youtube.com/vi/S6f6wWbvQSk/maxresdefault.jpg', link: 'https://youtu.be/S6f6wWbvQSk?si=dTMkRaDnfDsz2LCF' }
  ],
  track3: [
    { type: 'img', src: 'https://img.youtube.com/vi/CElbYjc_5ic/maxresdefault.jpg', link: 'https://youtu.be/CElbYjc_5ic?si=9j1dTX03O1vkuJ6W' },

    { type: 'img', src: 'https://img.youtube.com/vi/Bwye0hbbRWU/maxresdefault.jpg', link: 'https://youtu.be/S6f6wWbvQSk?si=dTMkRaDnfDsz2LCF' },
    { type: 'img', src: 'https://img.youtube.com/vi/zIcI8Izyim8/maxresdefault.jpg', link: 'https://youtu.be/zIcI8Izyim8?si=ULCvQxmSy1wvS8e_' },

    { type: 'img', src: 'https://img.youtube.com/vi/fxk9posx6Z8/maxresdefault.jpg', link: 'https://youtu.be/video11' },

    { type: 'img', src: 'https://img.youtube.com/vi/UFGQdL0vwmY/maxresdefault.jpg', link: 'https://youtu.be/video12' }
  ]
};

function createTrack(trackId, speedSeconds = 10) {
  const track = document.getElementById(trackId);
  const mediaItems = mediaSets[trackId];

  function createMediaElement(item) {
    const wrapper = document.createElement('div');
    wrapper.className = 'media-item-wrapper';

    const a = document.createElement('a');
    a.href = item.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.src;
      img.className = 'media-item';
      a.appendChild(img);
    } else if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.className = 'media-item';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      a.appendChild(video);
    }

    wrapper.appendChild(a);
    return wrapper;
  }

  // Append original and its clone
  for (let i = 0; i < 2; i++) {
    mediaItems.forEach(item => {
      const element = createMediaElement(item);
      track.appendChild(element);
    });
  }

  track.style.animationDuration = `${speedSeconds}s`;

  // Pause on hover
  track.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('mouseenter', () => track.classList.add('paused'));
    item.addEventListener('mouseleave', () => track.classList.remove('paused'));
  });
}

createTrack('track1', 30);
createTrack('track2', 35);
createTrack('track3', 40);


// Infinite scroll
const gameMediaSets = {
  gameTrack1: [
  { src: './assets/images/tetris.jpeg', link: 'games/candy-crush/index.html' },
  { src: './assets/images/tic tac toe.svg', link: 'games/word-guessing/index.html' },
  { src: './assets/images/space.jpeg', link: 'games/candy-crush/index.html' },
    { src: './assets/images/guess.png', link: 'games/word-guessing/index.html' },
    { src: './assets/images/quiz.jpeg', link: 'games/candy-crush/index.html' }
  ],
  gameTrack2: [
  { src: './assets/images/map.jpeg', link: 'games/candy-crush/index.html' },
  { src: './assets/images/whac a mole.jpeg', link: 'games/word-guessing/index.html' },
  { src: './assets/images/snake.png', link: 'games/candy-crush/index.html' },
  { src: './assets/images/mines.jpeg', link: 'games/word-guessing/index.html' },
  { src: './assets/images/space.jpeg', link: 'games/candy-crush/index.html' }
  ],
  gameTrack3: [
    { src: './assets/images/typing.jpeg', link: 'games/typing-speed/index.html' },
    { src: './assets/images/candy.jpeg', link: 'games/candy-crush/index.html' },
    { src: './assets/images/flappy.png', link: 'games/typing-speed/index.html' },
    { src: './assets/images/dice.jpeg', link: 'games/candy-crush/index.html' },
    { src: './assets/images/scramble.jpeg', link: 'games/typing-speed/index.html' },
  ]
};

function createGameTrack(trackId, speedSeconds = 30) {
  const track = document.getElementById(trackId);
  const mediaItems = gameMediaSets[trackId];

  function createMediaElement(item) {
    const a = document.createElement('a');
    a.href = item.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = item.src;
    img.className = 'media-item';

    a.appendChild(img);
    return a;
  }

  for (let i = 0; i < 2; i++) {
    mediaItems.forEach(item => {
      const element = createMediaElement(item);
      track.appendChild(element);
    });
  }

  track.style.animationDuration = `${speedSeconds}s`;

  track.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('mouseenter', () => track.classList.add('paused'));
    item.addEventListener('mouseleave', () => track.classList.remove('paused'));
  });
}

createGameTrack('gameTrack1', 25);
createGameTrack('gameTrack2', 30);
createGameTrack('gameTrack3', 35);