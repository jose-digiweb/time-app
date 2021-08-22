export const fullScreenMode = () => {
  function getFullScreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function toggleFullscreen() {
    if (getFullScreenElement()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(err);
      });
    }
  }

  document.addEventListener('dblclick', toggleFullscreen);
};
