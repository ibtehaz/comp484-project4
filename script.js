const locations = [
    null,
    (OviattLibrary = [34.240408, 34.239488, -118.528616, -118.530045]),
    (MatadorSquare = [34.239715, 34.239194, -118.527433, -118.528149]),
    (ExperimentalTheatre = [34.237302, 34.235545, -118.524704, -118.527302]),
    (UniversityStudentUnion = [34.240909, 34.239189, -118.524686, -118.527266]),
    (Matadome = [34.24261, 34.241226, -118.525333, -118.527033]),
  ];
  
  let map;
  let questionNumber = 1;
  let correctAnswers = 0;
  const ColorCorrect = "#00FF00";
  const ColorWrong = "#FF0000";
  const MAXQUESTIONS = locations.length - 1;
  
  function initMap() {
    showQuestion(questionNumber);
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 34.239171, lng: -118.527593 },
      zoom: 17,
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      draggable: false,
      clickableIcons: false,
      disableDefaultUI: true,
      gestureHandling: "none",
      styles: [
        //PLACES OF INTEREST LABELS
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        // ROAD LABELS
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    });
  
    map.addListener("dblclick", function (answer) {
      if (!timerIsOn) startTimer();
  
      if (questionNumber < locations.length) {
        let Point = getUserAnswer(answer);
        processAnswer(locations[questionNumber], Point);
  
        questionNumber++;
        showQuestion(questionNumber);
      }
      if (questionNumber == locations.length) {
        showScore();
        clearInterval(timer);
      }
    });
  }
  
  function showScore() {
    s = document.getElementById("score");
    s.innerHTML = " You Got " + correctAnswers + " Out of " + MAXQUESTIONS;
  }
  function processAnswer(location, point) {
    if (isInside(location, point)) {
      colorRectangle(location, true);
      colorWord(questionNumber, true);
      wordPrompt(questionNumber, true);
      correctAnswers++;
    } else if (!isInside(location, point)) {
      colorRectangle(location, false);
      colorWord(questionNumber, false);
      wordPrompt(questionNumber, false);
    } else console.log("erorrsrsr");
  }
  function getUserAnswer(answer) {
    return [answer.latLng.lat(), answer.latLng.lng()];
  }
  function showQuestion(i) {
    if (i < locations.length) {
      let q = document.getElementById("q" + i);
      q.style.display = "block";
    }
  }
  function isInside(box, point) {
    if (
      point[0] <= box[0] &&
      point[0] >= box[1] &&
      point[1] <= box[2] &&
      point[1] >= box[3]
    )
      return true;
    else return false;
  }
  
  function wordPrompt(i, isCorrect) {
    let w = document.getElementById("a" + i);
    if (isCorrect) {
      w.innerHTML = "CORRECT!";
    } else if (!isCorrect) {
      w.innerHTML = "WRONG!";
    }
  }
  function colorWord(i, isCorrect) {
    if (i < locations.length) {
      let w = document.getElementById("a" + i);
      if (isCorrect) {
        w.style.background = ColorCorrect;
      } else if (!isCorrect) {
        w.style.background = ColorWrong;
      } else console.log("errorrss");
    }
  }
  function colorRectangle(location, isCorrect) {
    if (isCorrect) {
      let library = new google.maps.Rectangle({
        strokeColor: ColorCorrect,
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: ColorCorrect,
        fillOpacity: 0.3,
        map: map,
        bounds: {
          north: location[0],
          south: location[1],
          east: location[2],
          west: location[3],
        },
      });
    } else if (!isCorrect) {
      let library = new google.maps.Rectangle({
        strokeColor: ColorWrong,
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: ColorWrong,
        fillOpacity: 0.3,
        map: map,
        bounds: {
          north: location[0],
          south: location[1],
          east: location[2],
          west: location[3],
        },
      });
    }
  }
  
  /////TIMER FUNCTIONS
  let min = 0,
    sec = 0,
    hun = 0,
    timer = 0;
  let timerIsOn = false;
  const theTimer = document.querySelector(".timer");
  
  function leadingNum() {
    if (hun < 10) hun = "0" + hun;
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
  }
  
  function add() {
    hun++;
    if (hun == 100) {
      hun = 0;
      sec++;
      if (sec == 60) {
        sec = 0;
        min++;
      }
    }
    theTimer.innerHTML = min + ":" + sec + ":" + hun;
  }
  
  function startTimer() {
    timerIsOn = true;
    timer = setInterval(add, 10);
  }
  
  window.onload = initMap;