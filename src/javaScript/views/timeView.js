import nightBg from '../../assets/desktop/bg-image-nighttime.jpg';
import dayBg from '../../assets/desktop/bg-image-daytime.jpg';

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

    //--> Render the Background Image
    this.timeEl.textContent >= '17:00'
      ? (this.bg.style.backgroundImage = `url(${nightBg})`)
      : (this.bg.style.backgroundImage = `url(${dayBg})`);
  }
}

export default new TimeView();
