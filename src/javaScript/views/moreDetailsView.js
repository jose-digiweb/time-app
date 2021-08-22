class MoreDetailsView {
  btnMoreEl = document.querySelector('.btn__more');
  btnLessEl = document.querySelector('.btn__less');
  quoteEl = document.querySelector('.quote');
  moreDetailsEl = document.querySelector('.more__details');
  timezone = document.querySelector('.timezone');
  currentWeek = document.querySelector('.currentWeek');
  dayYear = document.querySelector('.dayYear');
  weekNumber = document.querySelector('.weekNumber');
  wrapper = document.querySelector('.wrapper');

  renderMoreDetails(timezone, currentWeek, dayYear, weekNumber) {
    this.timezone.textContent = timezone;
    this.currentWeek.textContent = currentWeek;
    this.dayYear.textContent = dayYear;
    this.weekNumber.textContent = weekNumber;
  }

  _showMore() {
    this.quoteEl.style.transform = 'scaleY(0)';

    setTimeout(() => {
      this.quoteEl.style.display = 'none';
      this.moreDetailsEl.style.transform = 'scaleY(1)';

      if (window.innerWidth >= 1130) {
        this.wrapper.style.justifyContent = 'flex-end';
        this.wrapper.style.paddingBottom = '450px';
      }

      if (window.innerWidth < 1130) {
        this.wrapper.style.justifyContent = 'flex-end';
        this.wrapper.style.paddingBottom = '500px';
      }

      if (window.innerWidth <= 1024) {
        this.wrapper.style.justifyContent = 'flex-end';
        this.wrapper.style.paddingBottom = '400px';
      }

      if (window.innerWidth <= 660) {
        this.wrapper.style.justifyContent = 'flex-end';
        this.wrapper.style.paddingBottom = '324px';
      }
    }, 100);

    this.btnMoreEl.style.display = 'none';
    this.btnLessEl.style.display = 'flex';
  }

  _showLess() {
    this.moreDetailsEl.style.transform = 'scaleY(0)';

    this.wrapper.style.paddingBottom = '80px';

    this.btnMoreEl.style.display = 'flex';
    this.btnLessEl.style.display = 'none';

    setTimeout(() => {
      this.wrapper.style.justifyContent = 'space-between';
      this.quoteEl.style.display = 'flex';
      this.quoteEl.style.transform = 'scaleY(1)';
    }, 300);
  }

  handleShowMore() {
    this.btnMoreEl.addEventListener('click', this._showMore.bind(this));
  }

  handleShowLess() {
    this.btnLessEl.addEventListener('click', this._showLess.bind(this));
  }
}

export default new MoreDetailsView();
