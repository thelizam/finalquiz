const url = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1pSfBJwwN_mzI6S1_6McCq2JNbm4Y-eBCQ&usqp=CAU",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Spaghetti_bolognese_%28hozinja%29.jpg/330px-Spaghetti_bolognese_%28hozinja%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Full_irish_breakfast_55.jpg/330px-Full_irish_breakfast_55.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Portuguese_egg_tart_in_Macau.jpg/330px-Portuguese_egg_tart_in_Macau.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Galaktoboureko.jpg/330px-Galaktoboureko.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Korean_stew-Kimchi_jjigae-05.jpg/1200px-Korean_stew-Kimchi_jjigae-05.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Th%C3%BCringer_Rostbratwurst.jpg/263px-Th%C3%BCringer_Rostbratwurst.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Burrito.JPG/375px-Burrito.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Brigadeiro.jpg/330px-Brigadeiro.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Golden_Maki_Rainbow_Roll_sushi.jpg/330px-Golden_Maki_Rainbow_Roll_sushi.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Cr%C3%A8me_br%C3%BBl%C3%A9e_%284554822506%29.jpg/330px-Cr%C3%A8me_br%C3%BBl%C3%A9e_%284554822506%29.jpg",
  ];
  const correctAnswers = [
    '',
    'Italy',
    'Ireland',
    'Portugal',
    'Greece',
    'Korea',
    'Germany',
    'Mexico',
    'Brazil',
    'Japan',
    'France',
  ];
  const content = document.getElementById('content');
  const nextButton = document.getElementById('nextBtn');
  const previousBtn = document.getElementById("previousBtn");
  const startBtn = document.getElementById("startBtn");
  
  let currentUrlIndex = 0;
  userScore = 0;

function showPics(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            img.style.width = '500px';
            img.style.height = '500px';
            img.style.objectFit = 'cover'; 
            content.innerHTML = '';
            content.appendChild(img);

            let input = document.createElement('input');
            input.type = 'text';
            input.addEventListener('keydown', function(event) {
                if (event.key == 'Enter') {
                    localStorage.setItem(url, this.value);
                }
            });
            content.appendChild(input);

            let storedValue = localStorage.getItem(url);
            if (storedValue) {
                input.value = storedValue;
            }

            let button = document.createElement('button');
            button.innerHTML = 'Submit';
            button.onclick = function() {
                checkAnswer(input, url); 
            };
            content.appendChild(button);
        })
        .catch(e => {
            console.log('There has been a problem with the fetch operation: ' + e.message);
        });
} 
  function checkAnswer(input, url) {
      let feedback = document.createElement('p');
      if (input.value.toLowerCase() == correctAnswers[currentUrlIndex].toLowerCase()) {
          feedback.textContent = 'Correct!';
          feedback.style.color = 'green';
          userScore++;
      } else {
          feedback.textContent = 'Incorrect. The correct answer is ' + correctAnswers[currentUrlIndex];
          feedback.style.color = 'red';
      }
      content.appendChild(feedback);
      localStorage.setItem(url, input.value);
      // Wait a bit before moving to the next image to ensure the user sees the feedback message
      setTimeout(nextImage, 2000);
  }
  function nextImage() {
    if (currentUrlIndex < url.length - 1) {
        currentUrlIndex++;
        showPics(url[currentUrlIndex]);
    } else {
        alert('No more images to show!');
        alert(`Your final score is: ${userScore}`);
    }
} nextButton.onclick = nextImage;
function previousImage() {
    if (currentUrlIndex > 0) {
        currentUrlIndex--;
        showPics(url[currentUrlIndex]);
    } else {
        alert('No more images to show!');
    }
} previousBtn.onclick = previousImage;
// Show the first image
showPics(url[currentUrlIndex]);

function startCountdown(seconds){ 
    const timer = document.getElementById("timer");
    const interval = setInterval(function () {
      seconds--; 
      timer.textContent = seconds;
  
      if(seconds == 10){
          timer.style.color = "red"; 
      }
      if (seconds <= 0){
              clearInterval(interval);
              alert("Game over!");
              alert(`Your final score is: ${userScore}`);
      }
   }, 1000);
  }
  startBtn.addEventListener("click", function(){
  startCountdown(60);
  nextImage();
  this.style.display = 'none';
  localStorage.clear();
  });