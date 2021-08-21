//--> Importing Assets
import desktopNightBg from '../../assets/desktop/bg-image-nighttime.jpg';
import desktopDayBg from '../../assets/desktop/bg-image-daytime.jpg';
import tabletNightBg from '../../assets/tablet/bg-image-nighttime.jpg';
import tabletDayBg from '../../assets/tablet/bg-image-daytime.jpg';
import mobileNightBg from '../../assets/mobile/bg-image-nighttime.jpg';
import mobileDayBg from '../../assets/mobile/bg-image-daytime.jpg';

class TimeView {
  timeEl = document.querySelector('.time');
  countryCodeEl = document.querySelector('.country__code');
  timeZoneEL = document.querySelector('.city__text');
  spinnerEL = document.querySelector('.spinner');
  greetingEL = document.querySelector('.greeting__text');
  iconEL = document.querySelector('.sun__icon');
  bg = document.querySelector('.bg');

  _greeting() {
    if (this.timeEl.textContent < '12:00') return 'good morning';
    if (this.timeEl.textContent < '17:00') return 'good afternoon';
    if (this.timeEl.textContent >= '17:00') return 'good evening';
  }

  renderSpinner() {
    this.timeEl.insertAdjacentHTML('afterbegin', '<div class="spinner"></div>');
  }

  _renderBG() {
    //--> Render the Background Image
    if (window.innerWidth > 1130) {
      this.timeEl.textContent >= '17:00'
        ? (this.bg.style.backgroundImage = `url(${desktopNightBg})`)
        : (this.bg.style.backgroundImage = `url(${desktopDayBg})`);
    }
    if (window.innerWidth < 1130) {
      this.timeEl.textContent >= '17:00'
        ? (this.bg.style.backgroundImage = `url(${tabletNightBg})`)
        : (this.bg.style.backgroundImage = `url(${tabletDayBg})`);
    }
    if (window.innerWidth < 660) {
      this.timeEl.textContent >= '17:00'
        ? (this.bg.style.backgroundImage = `url(${mobileNightBg})`)
        : (this.bg.style.backgroundImage = `url(${mobileDayBg})`);
    }
  }

  renderTime(time, countryCode, timeZone) {
    //--> Render the Time, Country Code, and Timezone
    this.timeEl.textContent = time.slice(11, 16);
    this.countryCodeEl.textContent = countryCode;
    this.timeZoneEL.textContent = `IN ${timeZone
      .toUpperCase()
      .split('/')
      .join(', ')}`;

    //--> Render the Sun or Moon Icon
    this.timeEl.textContent < '17:00'
      ? this.iconEL.insertAdjacentHTML(
          'afterbegin',
          `<i class='fas fa-sun'></i>`
        )
      : this.iconEL.insertAdjacentHTML(
          'afterbegin',
          `<i class='fas fa-moon'></i>`
        );

    //--> Render the Greeting
    this.greetingEL.textContent = `${this._greeting()}, it's currently`;

    //--> Render the Background Image Responsively
    this._renderBG();
  }
}

export default new TimeView();
