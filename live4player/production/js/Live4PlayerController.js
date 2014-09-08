(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define([], function() {
    var Live4PlayerController;
    Live4PlayerController = (function() {
      function Live4PlayerController(player) {
        this.player = player;
        this.startPlay = __bind(this.startPlay, this);
        this.startLoading = __bind(this.startLoading, this);
        this.showCurrent = __bind(this.showCurrent, this);
        this.addLeadingZero = __bind(this.addLeadingZero, this);
        this.showDuration = __bind(this.showDuration, this);
        this.progressChange = __bind(this.progressChange, this);
        this.loadedMetaData = __bind(this.loadedMetaData, this);
        this.waiting = __bind(this.waiting, this);
        this.volumeState = __bind(this.volumeState, this);
        this.unmute = __bind(this.unmute, this);
        this.mute = __bind(this.mute, this);
        this.ended = __bind(this.ended, this);
        this.playState = __bind(this.playState, this);
        this.togglePlayState = __bind(this.togglePlayState, this);
        this.pause = __bind(this.pause, this);
        this.play = __bind(this.play, this);
        this.seek = __bind(this.seek, this);
        this.fsoff = __bind(this.fsoff, this);
        this.fson = __bind(this.fson, this);
        this.seeked = __bind(this.seeked, this);
        this.base_button = this.player.querySelector('.live4player-base');
        this.load_button = this.player.querySelector('.live4player-load');
        this.video = this.player.querySelector('.live4player-video');
        this.current = this.player.querySelector('.live4player-navigation-progressbar-progress');
        this.seekable = this.player.querySelector('.live4player-navigation-progressbar-seekable');
        this.time_current = this.player.querySelector('.live4player-navigation-time-current');
        this.time_duration = this.player.querySelector('.live4player-navigation-time-duration');
        this.video.addEventListener('loadedmetadata', this.loadedMetaData, false);
        this.video.addEventListener('canplay', this.startPlay, false);
        this.video.addEventListener('durationchange', this.showDuration, false);
        this.video.addEventListener('timeupdate', this.showCurrent, false);
        this.video.addEventListener('waiting', this.waiting, false);
        this.video.addEventListener('stalled', this.waiting, false);
        this.video.addEventListener('loadstart', this.waiting, false);
        this.video.addEventListener('seeking', this.waiting, false);
        this.video.addEventListener('seeked', this.seeked, false);
        this.seekable.addEventListener('click', this.seek, false);
        this.play_button = this.player.querySelector('.live4player-navigation-play');
        this.pause_button = this.player.querySelector('.live4player-navigation-pause');
        this.play_button.addEventListener('click', this.play, false);
        this.pause_button.addEventListener('click', this.pause, false);
        this.base_button.addEventListener('click', this.togglePlayState, false);
        this.video.addEventListener('playing', this.playState, false);
        this.video.addEventListener('pause', this.playState, false);
        this.video.addEventListener('play', this.playState, false);
        this.video.addEventListener('ended', this.ended, false);
        this.playState();
        this.mute_button = this.player.querySelector('.live4player-navigation-mute');
        this.unmute_button = this.player.querySelector('.live4player-navigation-unmute');
        this.mute_button.addEventListener('click', this.mute, false);
        this.unmute_button.addEventListener('click', this.unmute, false);
        this.video.addEventListener('volumechange', this.volumeState, false);
        this.volumeState();
        this.fson_button = this.player.querySelector('.live4player-navigation-fson');
        this.fsoff_button = this.player.querySelector('.live4player-navigation-fsoff');
        this.fson_button.addEventListener('click', this.fson, false);
        this.fsoff_button.addEventListener('click', this.fsoff, false);
        this.load_button.addEventListener('click', this.startLoading, false);
      }

      Live4PlayerController.prototype.seeked = function(event) {
        return this.player.classList.remove('live4player-loading');
      };

      Live4PlayerController.prototype.fson = function(event) {
        this.player.classList.add('live4player-fsmode');
        if (this.player.requestFullscreen) {
          return this.player.requestFullscreen();
        } else if (this.player.msRequestFullscreen) {
          return this.player.msRequestFullscreen();
        } else if (this.player.mozRequestFullScreen) {
          return this.player.mozRequestFullScreen();
        } else if (this.player.webkitRequestFullscreen) {
          return this.player.webkitRequestFullscreen();
        }
      };

      Live4PlayerController.prototype.fsoff = function(event) {
        this.player.classList.remove('live4player-fsmode');
        if (document.exitFullscreen) {
          return document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          return document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          return document.msExitFullscreen();
        } else if (document.webkitExitFullscreen) {
          return document.webkitExitFullscreen();
        }
      };

      Live4PlayerController.prototype.seek = function(event) {
        var time;
        time = this.video.seekable.start(0) + ((event.layerX / this.seekable.offsetWidth) * (this.video.seekable.end(0) - this.video.seekable.start(0)));
        if (this.video.fastSeek) {
          return this.video.fastSeek(time);
        } else {
          return this.video.currentTime = time;
        }
      };

      Live4PlayerController.prototype.play = function(event) {
        return this.video.play();
      };

      Live4PlayerController.prototype.pause = function(event) {
        return this.video.pause();
      };

      Live4PlayerController.prototype.togglePlayState = function(event) {
        if (this.player.classList.contains('live4player-playing')) {
          return this.video.pause();
        } else {
          return this.video.play();
        }
      };

      Live4PlayerController.prototype.playState = function(event) {
        switch (this.video.paused) {
          case true:
            return this.player.classList.remove('live4player-playing');
          default:
            this.player.classList.add('live4player-playing');
            return this.player.classList.remove('live4player-loading');
        }
      };

      Live4PlayerController.prototype.ended = function(event) {
        return this.player.classList.remove('live4player-playing');
      };

      Live4PlayerController.prototype.mute = function(event) {
        return this.video.muted = true;
      };

      Live4PlayerController.prototype.unmute = function(event) {
        return this.video.muted = false;
      };

      Live4PlayerController.prototype.volumeState = function(event) {
        switch (this.video.muted) {
          case true:
            return this.player.classList.add('live4player-muted');
          default:
            return this.player.classList.remove('live4player-muted');
        }
      };

      Live4PlayerController.prototype.waiting = function(event) {
        return this.player.classList.add('live4player-loading');
      };

      Live4PlayerController.prototype.loadedMetaData = function(event) {
        this.showCurrent();
        return this.showDuration();
      };

      Live4PlayerController.prototype.progressChange = function() {
        this.seekable.style.width = ((this.video.seekable.end(0) - this.video.seekable.start(0)) * 100 / this.video.duration) + '%';
        return this.seekable.style.left = (this.video.seekable.start(0) * 100 / this.video.duration) + '%';
      };

      Live4PlayerController.prototype.showDuration = function() {
        var duration_m, duration_s;
        console.log('duration:', this.video.duration);
        duration_m = this.addLeadingZero(Math.floor(this.video.duration / 60));
        duration_s = this.addLeadingZero(Math.ceil(this.video.duration % 60));
        return this.time_duration.innerHTML = ' ' + duration_m + ":" + duration_s + ' ';
      };

      Live4PlayerController.prototype.addLeadingZero = function(digital) {
        if (digital < 10) {
          return '0' + digital;
        }
        return digital;
      };

      Live4PlayerController.prototype.showCurrent = function() {
        var played_m, played_s;
        this.current.style.width = (this.video.currentTime * 100 / this.video.duration) + '%';
        played_m = this.addLeadingZero(Math.floor(this.video.currentTime / 60));
        played_s = this.addLeadingZero(Math.ceil(this.video.currentTime % 60));
        this.time_current.innerHTML = ' ' + played_m + ':' + played_s + ' ';
        return this.progressChange();
      };

      Live4PlayerController.prototype.startLoading = function(event) {
        this.player.classList.remove('live4player-static');
        this.player.classList.add('live4player-loading');
        return this.video.load();
      };

      Live4PlayerController.prototype.startPlay = function(event) {
        console.log('can play');
        return this.video.play();
      };

      return Live4PlayerController;

    })();
    window.Live4PlayerController = Live4PlayerController;
    return Live4PlayerController;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGl2ZTRQbGF5ZXJDb250cm9sbGVyLmpzIiwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXMiOlsiTGl2ZTRQbGF5ZXJDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgdmFyIF9fYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH07XG5cbiAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgTGl2ZTRQbGF5ZXJDb250cm9sbGVyO1xuICAgIExpdmU0UGxheWVyQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICAgIGZ1bmN0aW9uIExpdmU0UGxheWVyQ29udHJvbGxlcihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuc3RhcnRQbGF5ID0gX19iaW5kKHRoaXMuc3RhcnRQbGF5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5zdGFydExvYWRpbmcgPSBfX2JpbmQodGhpcy5zdGFydExvYWRpbmcsIHRoaXMpO1xuICAgICAgICB0aGlzLnNob3dDdXJyZW50ID0gX19iaW5kKHRoaXMuc2hvd0N1cnJlbnQsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExlYWRpbmdaZXJvID0gX19iaW5kKHRoaXMuYWRkTGVhZGluZ1plcm8sIHRoaXMpO1xuICAgICAgICB0aGlzLnNob3dEdXJhdGlvbiA9IF9fYmluZCh0aGlzLnNob3dEdXJhdGlvbiwgdGhpcyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDaGFuZ2UgPSBfX2JpbmQodGhpcy5wcm9ncmVzc0NoYW5nZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubG9hZGVkTWV0YURhdGEgPSBfX2JpbmQodGhpcy5sb2FkZWRNZXRhRGF0YSwgdGhpcyk7XG4gICAgICAgIHRoaXMud2FpdGluZyA9IF9fYmluZCh0aGlzLndhaXRpbmcsIHRoaXMpO1xuICAgICAgICB0aGlzLnZvbHVtZVN0YXRlID0gX19iaW5kKHRoaXMudm9sdW1lU3RhdGUsIHRoaXMpO1xuICAgICAgICB0aGlzLnVubXV0ZSA9IF9fYmluZCh0aGlzLnVubXV0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubXV0ZSA9IF9fYmluZCh0aGlzLm11dGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmVuZGVkID0gX19iaW5kKHRoaXMuZW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXlTdGF0ZSA9IF9fYmluZCh0aGlzLnBsYXlTdGF0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMudG9nZ2xlUGxheVN0YXRlID0gX19iaW5kKHRoaXMudG9nZ2xlUGxheVN0YXRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXVzZSA9IF9fYmluZCh0aGlzLnBhdXNlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ID0gX19iaW5kKHRoaXMucGxheSwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2VlayA9IF9fYmluZCh0aGlzLnNlZWssIHRoaXMpO1xuICAgICAgICB0aGlzLmZzb2ZmID0gX19iaW5kKHRoaXMuZnNvZmYsIHRoaXMpO1xuICAgICAgICB0aGlzLmZzb24gPSBfX2JpbmQodGhpcy5mc29uLCB0aGlzKTtcbiAgICAgICAgdGhpcy5zZWVrZWQgPSBfX2JpbmQodGhpcy5zZWVrZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmJhc2VfYnV0dG9uID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLWJhc2UnKTtcbiAgICAgICAgdGhpcy5sb2FkX2J1dHRvbiA9IHRoaXMucGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5saXZlNHBsYXllci1sb2FkJyk7XG4gICAgICAgIHRoaXMudmlkZW8gPSB0aGlzLnBsYXllci5xdWVyeVNlbGVjdG9yKCcubGl2ZTRwbGF5ZXItdmlkZW8nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLW5hdmlnYXRpb24tcHJvZ3Jlc3NiYXItcHJvZ3Jlc3MnKTtcbiAgICAgICAgdGhpcy5zZWVrYWJsZSA9IHRoaXMucGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5saXZlNHBsYXllci1uYXZpZ2F0aW9uLXByb2dyZXNzYmFyLXNlZWthYmxlJyk7XG4gICAgICAgIHRoaXMudGltZV9jdXJyZW50ID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLW5hdmlnYXRpb24tdGltZS1jdXJyZW50Jyk7XG4gICAgICAgIHRoaXMudGltZV9kdXJhdGlvbiA9IHRoaXMucGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5saXZlNHBsYXllci1uYXZpZ2F0aW9uLXRpbWUtZHVyYXRpb24nKTtcbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIHRoaXMubG9hZGVkTWV0YURhdGEsIGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgdGhpcy5zdGFydFBsYXksIGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdkdXJhdGlvbmNoYW5nZScsIHRoaXMuc2hvd0R1cmF0aW9uLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMuc2hvd0N1cnJlbnQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCd3YWl0aW5nJywgdGhpcy53YWl0aW5nLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignc3RhbGxlZCcsIHRoaXMud2FpdGluZywgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIHRoaXMud2FpdGluZywgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3NlZWtpbmcnLCB0aGlzLndhaXRpbmcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdzZWVrZWQnLCB0aGlzLnNlZWtlZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNlZWthYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZWVrLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucGxheV9idXR0b24gPSB0aGlzLnBsYXllci5xdWVyeVNlbGVjdG9yKCcubGl2ZTRwbGF5ZXItbmF2aWdhdGlvbi1wbGF5Jyk7XG4gICAgICAgIHRoaXMucGF1c2VfYnV0dG9uID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLW5hdmlnYXRpb24tcGF1c2UnKTtcbiAgICAgICAgdGhpcy5wbGF5X2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnBhdXNlX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGF1c2UsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5iYXNlX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlUGxheVN0YXRlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHRoaXMucGxheVN0YXRlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB0aGlzLnBsYXlTdGF0ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCB0aGlzLnBsYXlTdGF0ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgdGhpcy5lbmRlZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnBsYXlTdGF0ZSgpO1xuICAgICAgICB0aGlzLm11dGVfYnV0dG9uID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLW5hdmlnYXRpb24tbXV0ZScpO1xuICAgICAgICB0aGlzLnVubXV0ZV9idXR0b24gPSB0aGlzLnBsYXllci5xdWVyeVNlbGVjdG9yKCcubGl2ZTRwbGF5ZXItbmF2aWdhdGlvbi11bm11dGUnKTtcbiAgICAgICAgdGhpcy5tdXRlX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubXV0ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnVubXV0ZV9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnVubXV0ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3ZvbHVtZWNoYW5nZScsIHRoaXMudm9sdW1lU3RhdGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy52b2x1bWVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmZzb25fYnV0dG9uID0gdGhpcy5wbGF5ZXIucXVlcnlTZWxlY3RvcignLmxpdmU0cGxheWVyLW5hdmlnYXRpb24tZnNvbicpO1xuICAgICAgICB0aGlzLmZzb2ZmX2J1dHRvbiA9IHRoaXMucGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5saXZlNHBsYXllci1uYXZpZ2F0aW9uLWZzb2ZmJyk7XG4gICAgICAgIHRoaXMuZnNvbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZzb24sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5mc29mZl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZzb2ZmLCBmYWxzZSk7XG4gICAgICAgIHRoaXMubG9hZF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YXJ0TG9hZGluZywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLnNlZWtlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdsaXZlNHBsYXllci1sb2FkaW5nJyk7XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLmZzb24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnBsYXllci5jbGFzc0xpc3QuYWRkKCdsaXZlNHBsYXllci1mc21vZGUnKTtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllci5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYXllci53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllci53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLmZzb2ZmID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGl2ZTRwbGF5ZXItZnNtb2RlJyk7XG4gICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIExpdmU0UGxheWVyQ29udHJvbGxlci5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0aW1lO1xuICAgICAgICB0aW1lID0gdGhpcy52aWRlby5zZWVrYWJsZS5zdGFydCgwKSArICgoZXZlbnQubGF5ZXJYIC8gdGhpcy5zZWVrYWJsZS5vZmZzZXRXaWR0aCkgKiAodGhpcy52aWRlby5zZWVrYWJsZS5lbmQoMCkgLSB0aGlzLnZpZGVvLnNlZWthYmxlLnN0YXJ0KDApKSk7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvLmZhc3RTZWVrKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8uZmFzdFNlZWsodGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8uY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWRlby5wbGF5KCk7XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgICAgIH07XG5cbiAgICAgIExpdmU0UGxheWVyQ29udHJvbGxlci5wcm90b3R5cGUudG9nZ2xlUGxheVN0YXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLmNsYXNzTGlzdC5jb250YWlucygnbGl2ZTRwbGF5ZXItcGxheWluZycpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy52aWRlby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIExpdmU0UGxheWVyQ29udHJvbGxlci5wcm90b3R5cGUucGxheVN0YXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnZpZGVvLnBhdXNlZCkge1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdsaXZlNHBsYXllci1wbGF5aW5nJyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmNsYXNzTGlzdC5hZGQoJ2xpdmU0cGxheWVyLXBsYXlpbmcnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdsaXZlNHBsYXllci1sb2FkaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIExpdmU0UGxheWVyQ29udHJvbGxlci5wcm90b3R5cGUuZW5kZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGl2ZTRwbGF5ZXItcGxheWluZycpO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS5tdXRlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS51bm11dGUgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWRlby5tdXRlZCA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS52b2x1bWVTdGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy52aWRlby5tdXRlZCkge1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllci5jbGFzc0xpc3QuYWRkKCdsaXZlNHBsYXllci1tdXRlZCcpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGl2ZTRwbGF5ZXItbXV0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS53YWl0aW5nID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyLmNsYXNzTGlzdC5hZGQoJ2xpdmU0cGxheWVyLWxvYWRpbmcnKTtcbiAgICAgIH07XG5cbiAgICAgIExpdmU0UGxheWVyQ29udHJvbGxlci5wcm90b3R5cGUubG9hZGVkTWV0YURhdGEgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnNob3dDdXJyZW50KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dEdXJhdGlvbigpO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS5wcm9ncmVzc0NoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlZWthYmxlLnN0eWxlLndpZHRoID0gKCh0aGlzLnZpZGVvLnNlZWthYmxlLmVuZCgwKSAtIHRoaXMudmlkZW8uc2Vla2FibGUuc3RhcnQoMCkpICogMTAwIC8gdGhpcy52aWRlby5kdXJhdGlvbikgKyAnJSc7XG4gICAgICAgIHJldHVybiB0aGlzLnNlZWthYmxlLnN0eWxlLmxlZnQgPSAodGhpcy52aWRlby5zZWVrYWJsZS5zdGFydCgwKSAqIDEwMCAvIHRoaXMudmlkZW8uZHVyYXRpb24pICsgJyUnO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS5zaG93RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uX20sIGR1cmF0aW9uX3M7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkdXJhdGlvbjonLCB0aGlzLnZpZGVvLmR1cmF0aW9uKTtcbiAgICAgICAgZHVyYXRpb25fbSA9IHRoaXMuYWRkTGVhZGluZ1plcm8oTWF0aC5mbG9vcih0aGlzLnZpZGVvLmR1cmF0aW9uIC8gNjApKTtcbiAgICAgICAgZHVyYXRpb25fcyA9IHRoaXMuYWRkTGVhZGluZ1plcm8oTWF0aC5jZWlsKHRoaXMudmlkZW8uZHVyYXRpb24gJSA2MCkpO1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lX2R1cmF0aW9uLmlubmVySFRNTCA9ICcgJyArIGR1cmF0aW9uX20gKyBcIjpcIiArIGR1cmF0aW9uX3MgKyAnICc7XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZExlYWRpbmdaZXJvID0gZnVuY3Rpb24oZGlnaXRhbCkge1xuICAgICAgICBpZiAoZGlnaXRhbCA8IDEwKSB7XG4gICAgICAgICAgcmV0dXJuICcwJyArIGRpZ2l0YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZ2l0YWw7XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLnNob3dDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwbGF5ZWRfbSwgcGxheWVkX3M7XG4gICAgICAgIHRoaXMuY3VycmVudC5zdHlsZS53aWR0aCA9ICh0aGlzLnZpZGVvLmN1cnJlbnRUaW1lICogMTAwIC8gdGhpcy52aWRlby5kdXJhdGlvbikgKyAnJSc7XG4gICAgICAgIHBsYXllZF9tID0gdGhpcy5hZGRMZWFkaW5nWmVybyhNYXRoLmZsb29yKHRoaXMudmlkZW8uY3VycmVudFRpbWUgLyA2MCkpO1xuICAgICAgICBwbGF5ZWRfcyA9IHRoaXMuYWRkTGVhZGluZ1plcm8oTWF0aC5jZWlsKHRoaXMudmlkZW8uY3VycmVudFRpbWUgJSA2MCkpO1xuICAgICAgICB0aGlzLnRpbWVfY3VycmVudC5pbm5lckhUTUwgPSAnICcgKyBwbGF5ZWRfbSArICc6JyArIHBsYXllZF9zICsgJyAnO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzc0NoYW5nZSgpO1xuICAgICAgfTtcblxuICAgICAgTGl2ZTRQbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS5zdGFydExvYWRpbmcgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdsaXZlNHBsYXllci1zdGF0aWMnKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuY2xhc3NMaXN0LmFkZCgnbGl2ZTRwbGF5ZXItbG9hZGluZycpO1xuICAgICAgICByZXR1cm4gdGhpcy52aWRlby5sb2FkKCk7XG4gICAgICB9O1xuXG4gICAgICBMaXZlNFBsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLnN0YXJ0UGxheSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYW4gcGxheScpO1xuICAgICAgICByZXR1cm4gdGhpcy52aWRlby5wbGF5KCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTGl2ZTRQbGF5ZXJDb250cm9sbGVyO1xuXG4gICAgfSkoKTtcbiAgICB3aW5kb3cuTGl2ZTRQbGF5ZXJDb250cm9sbGVyID0gTGl2ZTRQbGF5ZXJDb250cm9sbGVyO1xuICAgIHJldHVybiBMaXZlNFBsYXllckNvbnRyb2xsZXI7XG4gIH0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9