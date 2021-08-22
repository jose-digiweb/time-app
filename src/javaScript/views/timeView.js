//--> Importing Assets
import desktopNightBg from '../../assets/desktop/bg-image-nighttime.jpg';
import desktopDayBg from '../../assets/desktop/bg-image-daytime.jpg';
import tabletNightBg from '../../assets/tablet/bg-image-nighttime.jpg';
import tabletDayBg from '../../assets/tablet/bg-image-daytime.jpg';
import mobileNightBg from '../../assets/mobile/bg-image-nighttime.jpg';
import mobileDayBg from '../../assets/mobile/bg-image-daytime.jpg';

class TimeView {
  timeWrapper = document.querySelector('.country__code');
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

  renderSpinner() {
    this.timeWrapper.insertAdjacentHTML(
      'afterbegin',
      '<div class="spinner"></div>'
    );
  }

  renderTime(time, countryCode, timeZone) {
    //--> Render the Background Image Responsively
    this._renderBG();

    setTimeout(() => {
      //--> Render the Sun or Moon Icon
      this.iconEL.style.opacity = '1';
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
      this.greetingEL.style.opacity = '1';
      this.greetingEL.textContent = `${this._greeting()}, it's currently`;

      //--> Render the Time, Country Code, and Timezone
      this.timeEl.style.opacity = '1';
      this.timeEl.textContent = time.slice(11, 16);

      this.countryCodeEl.textContent = countryCode;

      this.timeZoneEL.style.opacity = '1';
      this.timeZoneEL.textContent = `IN ${timeZone
        .toUpperCase()
        .split('/')
        .join(', ')}`;
    }, 1000);
  }
}

export default new TimeView();
