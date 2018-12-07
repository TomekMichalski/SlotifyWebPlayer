var currentPlaylist = [];
var audioElement;
var mouseDown = false;

function formatTime(seconds) { //120.4
    var time = Math.round(seconds); //120
    var minutes = Math.floor(time/60);  //2
    var seconds = time - (minutes * 60);    //120 - 120 = 0
    
    var extraZero = (seconds < 10) ? "0" : "";
    return minutes + ":" + extraZero + seconds
}
function updateTimeProgressBar(audio) {
    $(".progressTime.current").text(formatTime(audio.currentTime));
    $(".progressTime.remaining").text(formatTime(audio.duration-audio.currentTime));

    var progress = audio.currentTime / audio.duration * 100;
    $(".playbackBar .progress").css("width", progress + "%");
}
function Audio() {

    this.audio = document.createElement('audio');

    this.audio.addEventListener("canplay", function () {
        var duration = formatTime(this.duration);
        $(".progressTime.remaining").text(duration);
    });
    this.audio.addEventListener("timeupdate", function() {
        if(this.duration) {
            updateTimeProgressBar(this);
        }
    });

    this.setTrack = function(track) {
        this.audio.src = track.path;
        console.log(track);
        this.currentlyPlaying = track;
    }
    this.play = function() {
        this.audio.play();
    }
    this.pause = function() {
        this.audio.pause();
    }
    this.setTime = function(seconds) {
        this.audio.currentTime = seconds;
    }
}