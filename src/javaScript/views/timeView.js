//--> Importing Assets
import desktopNightBg from '../../assets/desktop/bg-image-nighttime.jpg';
import desktopDayBg from '../../assets/desktop/bg-image-daytime.jpg';
import tabletNightBg from '../../assets/tablet/bg-image-nighttime.jpg';
import tabletDayBg from '../../assets/tablet/bg-image-daytime.jpg';
import mobileNightBg from '../../assets/mobile/bg-image-nighttime.jpg';
import mobileDayBg from '../../assets/mobile/bg-image-daytime.jpg';

import { AFTERNOON, NOON } from '../config';

class TimeView {
  timeWrapper = document.querySelector('.country__code');
  timeEl = document.querySelector('.time');
  countryCodeEl = document.querySelector('.country__code');
  timeZoneEL = document.querySelector('.city__text');
  spinnerEL = document.querySelector('.spinner');
  greetingEL = document.querySelector('.greeting__text');
  iconEL = document.querySelector('.sun__icon');
  bg = document.querySelector('.bg');
  wrapper = document.querySelector('.wrapper');
  fullscreenMessage = document.querySelector('.fullscreen__message');

  _greeting() {
    if (this.timeEl.textContent < NOON) return 'good morning';
    if (this.timeEl.textContent < AFTERNOON) return 'good afternoon';
    if (this.timeEl.textContent >= AFTERNOON) return 'good evening';
  }

  _renderBG() {
    //--> Render the Background Image
    if (window.innerWidth > 1130) {
      this.timeEl.textContent >= AFTERNOON
        ? (this.bg.style.backgroundImage = `url(${desktopNightBg})`)
        : (this.bg.style.backgroundImage = `url(${desktopDayBg})`);
    }
    if (window.innerWidth < 1130) {
      this.timeEl.textContent >= AFTERNOON
        ? (this.bg.style.backgroundImage = `url(${tabletNightBg})`)
        : (this.bg.style.backgroundImage = `url(${tabletDayBg})`);
    }
    if (window.innerWidth < 660) {
      this.timeEl.textContent >= AFTERNOON
        ? (this.bg.style.backgroundImage = `url(${mobileNightBg})`)
        : (this.bg.style.backgroundImage = `url(${mobileDayBg})`);
    }
  }

  renderMessage() {
    this.fullscreenMessage.style.display = 'block';
    this.fullscreenMessage.style.opacity = '1';
  }

  deleteMessage() {
    this.fullscreenMessage.style.display = 'none';
    this.fullscreenMessage.style.opacity = '0';
  }

  renderSpinner() {
    this.timeWrapper.insertAdjacentHTML(
      'afterbegin',
      '<div class="spinner"></div>'
    );
  }

  renderTime(time, countryCode, timeZone, country) {
    setTimeout(() => {
      //--> Render the Time, Country Code, and Timezone
      this.timeEl.textContent = time.slice(11, 16);
      this.countryCodeEl.textContent = countryCode;
      this.timeZoneEL.textContent = `IN ${country}, ${timeZone[1]}`;

      [this.iconEL, this.greetingEL, this.timeEl, this.timeZoneEL].forEach(
        (el) => (el.style.opacity = '1')
      );

      //--> Render the Sun or Moon Icon
      this.iconEL.insertAdjacentHTML(
        'afterbegin',
        `<i class='fas fa-${
          this.timeEl.textContent < AFTERNOON ? 'sun' : 'moon'
        }'></i>`
      );

      //--> Render the Greeting
      this.greetingEL.textContent = `${this._greeting()}, it's currently`;
    }, 1000);

    //--> Render the Background Image Responsively
    this._renderBG();

    this.deleteMessage();
  }
}

export default new TimeView();
