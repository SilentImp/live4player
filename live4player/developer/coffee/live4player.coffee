requirejs [
    "modernizr/modernizr",
    "domReady",
    "Live4PlayerController"
  ], (
    dummy1,
    domReady,
    Live4PlayerController
  )->
    domReady ->
      for player in document.querySelectorAll('.live4player')
        new Live4PlayerController(player)
