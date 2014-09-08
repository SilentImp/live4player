(function() {
  requirejs(["modernizr/modernizr", "domReady", "Live4PlayerController"], function(dummy1, domReady, Live4PlayerController) {
    return domReady(function() {
      var player, _i, _len, _ref, _results;
      _ref = document.querySelectorAll('.live4player');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push(new Live4PlayerController(player));
      }
      return _results;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZTRwbGF5ZXIuanMiLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaXZlNHBsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gIHJlcXVpcmVqcyhbXCJtb2Rlcm5penIvbW9kZXJuaXpyXCIsIFwiZG9tUmVhZHlcIiwgXCJMaXZlNFBsYXllckNvbnRyb2xsZXJcIl0sIGZ1bmN0aW9uKGR1bW15MSwgZG9tUmVhZHksIExpdmU0UGxheWVyQ29udHJvbGxlcikge1xuICAgIHJldHVybiBkb21SZWFkeShmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwbGF5ZXIsIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICAgIF9yZWYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGl2ZTRwbGF5ZXInKTtcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcGxheWVyID0gX3JlZltfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2gobmV3IExpdmU0UGxheWVyQ29udHJvbGxlcihwbGF5ZXIpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9KTtcbiAgfSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=