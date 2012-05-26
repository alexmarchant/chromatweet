var colors = {
    49: "#fcbdbd", // Red
    50: "#abcced", // Blue
    51: "#b4e38d", // Green
    52: "#fafa91", // Yellow
    53: "#fcc29c", // Orange
    54: "#f7d4e1", // Pink
    55: "#dbcfe8", // Purple
    56: "#e3d2c1", // Brown
    57: "#d4d4a3" // Moss green 
  },
  storage,
  hoverObject,
  hoverTweets = false;

// Saves the screen name and associates it with a group
// depending on which digit was pressed.  E.G. if I pressed
// 1 while hovering "reddit" all "reddit" tweets would be in
// group 1 and colored the same way.
function retrieveStorage() {
  "use strict";
  if (localStorage.colorCodeStore) {
    storage = JSON.parse(localStorage.colorCodeStore);
    return storage;
  }
}

function saveStorage() {
  "use strict";
  localStorage.colorCodeStore = JSON.stringify(storage);
}

function toggleStorage(keyCode, screenName) {
  "use strict";
  var index;
  index = storage[keyCode].indexOf(screenName);
  if (index === -1) {
    storage[keyCode].push(screenName);
  } else {
    storage[keyCode].splice(index, 1);
  }
  saveStorage();
}

function addColor(screenName, keyCode) {
  "use strict";
  var styleSheet = "<style id= '" + screenName + "_styles" + "' type='text/css'>" +
    ".tweet[data-screen-name='" + screenName + "'] { background-color:" + colors[keyCode] + "; } " +
    "</style>";
  // Is this the best way to do this?
  $("body").append(styleSheet);
  // TODO Change hover color too
}

function removeColor(screenName) {
  "use strict";
  $("#" + screenName + "_styles").remove();
}

// Sets a live watcher to colorize any tweets matching the 
// given screenName
function toggleColor(screenName, keyCode) {
  "use strict";
  if ($("#" + screenName + "_styles").length > 0) {
    removeColor(screenName);
  } else {
    addColor(screenName, keyCode);
  }
}

// Keeps track if mouse is hovering a tweet or not
function trackHover() {
  "use strict";
  $(".tweet").live('mouseenter', function () {
    hoverTweets = true;
    hoverObject = $(this);
  }).live('mouseleave', function () {
    hoverTweets = false;
    hoverObject = undefined;
  });
}

function trackKeypress() {
  "use strict";
  $('body').keyup(function (e) {
    // Logs the keyCode of the key pressed, for testing
    // If the button pressed is one of the digits 1-9
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      // If the mouse is hovering a tweet
      if (hoverTweets) {
        var screenName = hoverObject.data("screen-name");
        toggleStorage(e.keyCode, screenName);
        toggleColor(screenName, e.keyCode);
      }
    }
  });
}

function initializer() {
  "use strict";
  if (!storage) {
    storage = retrieveStorage();
    if (!storage) {
      storage = {
        49: [],
        50: [],
        51: [],
        52: [],
        53: [],
        54: [],
        55: [],
        56: [],
        57: []
      };
      saveStorage();
    }
  }
  for (var key in storage) {
    $.each(storage[key], function(i,e){
      toggleColor(e, key);
    });
  }    
}



$(document).ready(function () {
  "use strict";
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32005274-2']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  initializer();
  trackHover();
  trackKeypress();
});

