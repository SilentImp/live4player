define [], ->

  class Live4PlayerController
    constructor: (@player)->

      @base_button = @player.querySelector('.live4player-base')
      @load_button = @player.querySelector('.live4player-load')
      @video = @player.querySelector('.live4player-video') 
      @current = @player.querySelector('.live4player-navigation-progressbar-progress')
      @seekable = @player.querySelector '.live4player-navigation-progressbar-seekable'
      @time_current = @player.querySelector('.live4player-navigation-time-current')
      @time_duration = @player.querySelector('.live4player-navigation-time-duration')

      @video.addEventListener('loadedmetadata', @loadedMetaData, false)
      @video.addEventListener('canplay', @startPlay, false)
      @video.addEventListener('durationchange', @showDuration, false)
      @video.addEventListener('timeupdate', @showCurrent, false)

      # не выбрасывается по какой то причине
      # @video.addEventListener('progress', @progressChange, false)

      # Загрузка ролика
      @video.addEventListener('waiting', @waiting, false)
      # Данные перестали поступать
      @video.addEventListener('stalled', @waiting, false)
      # Началась загрузка
      @video.addEventListener('loadstart', @waiting, false)
      # Началась перемотка
      @video.addEventListener('seeking', @waiting, false)
      # Закончилась перемотка
      @video.addEventListener('seeked', @seeked, false)
      
      # Перемотка
      @seekable.addEventListener('click', @seek, false)

      # Кнопки play/pause
      @play_button = @player.querySelector('.live4player-navigation-play')
      @pause_button = @player.querySelector('.live4player-navigation-pause')
      
      @play_button.addEventListener('click', @play, false)
      @pause_button.addEventListener('click', @pause, false)
      @base_button.addEventListener('click', @togglePlayState, false)

      @video.addEventListener('playing', @playState, false)
      @video.addEventListener('pause', @playState, false)
      @video.addEventListener('play', @playState, false)
      @video.addEventListener('ended', @ended, false)
      @playState()

      # Кнопки mute/unmute
      @mute_button = @player.querySelector('.live4player-navigation-mute')
      @unmute_button = @player.querySelector('.live4player-navigation-unmute')
      @mute_button.addEventListener('click', @mute, false)
      @unmute_button.addEventListener('click', @unmute, false)
      @video.addEventListener('volumechange', @volumeState, false)
      @volumeState()

      # Кнопки полноэкранного режима
      @fson_button = @player.querySelector('.live4player-navigation-fson')
      @fsoff_button = @player.querySelector('.live4player-navigation-fsoff')
      @fson_button.addEventListener('click', @fson, false)
      @fsoff_button.addEventListener('click', @fsoff, false)
      
      # Кнопка начала загрузки ролика
      @load_button.addEventListener('click', @startLoading, false)

    # Убираем значек загрузки по завершению пермотки. Нужно для Safari
    seeked: (event)=>
      @player.classList.remove('live4player-loading')

    # Полноэкранный режим
    fson: (event)=>
      @player.classList.add('live4player-fsmode')
      if @player.requestFullscreen
        @player.requestFullscreen()
      else if @player.msRequestFullscreen
        @player.msRequestFullscreen()
      else if @player.mozRequestFullScreen
        @player.mozRequestFullScreen()
      else if @player.webkitRequestFullscreen
        @player.webkitRequestFullscreen()

    fsoff: (event)=>
      @player.classList.remove('live4player-fsmode')
      if document.exitFullscreen
        document.exitFullscreen()
      else if document.mozCancelFullScreen
        document.mozCancelFullScreen()
      else if document.msExitFullscreen
        document.msExitFullscreen()
      else if document.webkitExitFullscreen
        document.webkitExitFullscreen()
      

    # Перемотка
    seek: (event)=>
      time = @video.seekable.start(0)+((event.layerX/@seekable.offsetWidth)*(@video.seekable.end(0)-@video.seekable.start(0)))
      if @video.fastSeek
        @video.fastSeek(time)
      else
        @video.currentTime = time

    # Проигрывание
    play: (event)=>
      @video.play()

    pause: (event)=>
      @video.pause()

    togglePlayState: (event)=>
      if @player.classList.contains('live4player-playing')
        @video.pause()
      else
        @video.play()

    playState: (event)=>
      switch @video.paused
        when true
          @player.classList.remove('live4player-playing')
        else
          @player.classList.add('live4player-playing')
          # если играет, то не подгружается
          @player.classList.remove('live4player-loading')

    # В IE после окончания проигрывания не переключается на паузу
    ended: (event)=>
      @player.classList.remove('live4player-playing')      
          

    # Работа со звуком
    mute: (event)=>
      @video.muted = true
    
    unmute: (event)=>
      @video.muted = false

    volumeState: (event)=>
      switch @video.muted
        when true
          @player.classList.add('live4player-muted')
        else
          @player.classList.remove('live4player-muted')


    # Процесс загрузки
    waiting: (event)=>
      @player.classList.add('live4player-loading')

    # Загрузились метаданные
    loadedMetaData: (event)=>
      @showCurrent()
      @showDuration()

    progressChange: =>
      # не вызывается
      @seekable.style.width = ((@video.seekable.end(0)-@video.seekable.start(0))*100/@video.duration)+'%'
      @seekable.style.left = (@video.seekable.start(0)*100/@video.duration)+'%'

    showDuration: =>
      console.log 'duration:', @video.duration
      duration_m = @addLeadingZero(Math.floor(@video.duration/60))
      duration_s = @addLeadingZero(Math.ceil(@video.duration%60))
      @time_duration.innerHTML = ' '+duration_m + ":" + duration_s+' '

    addLeadingZero: (digital)=>
      if digital<10
        return '0'+digital
      return digital

    showCurrent: =>
      @current.style.width = (@video.currentTime*100/@video.duration)+'%'
      played_m = @addLeadingZero(Math.floor(@video.currentTime/60))
      played_s = @addLeadingZero(Math.ceil(@video.currentTime%60))
      @time_current.innerHTML = ' '+played_m + ':' + played_s+' '

      @progressChange()

    startLoading: (event)=>
      @player.classList.remove('live4player-static')
      @player.classList.add('live4player-loading')
      @video.load()
    
    startPlay: (event)=>
      console.log 'can play'
      @video.play()  

  window.Live4PlayerController = Live4PlayerController

  return Live4PlayerController