class QuoteView {
  quoteEl = document.querySelector('.quote__text');
  authorEl = document.querySelector('.author');
  reloadBtn = document.querySelector('.reload__btn');

  renderSpinner() {
    this.quoteEl.textContent = '';
    this.quoteEl.insertAdjacentHTML(
      'afterbegin',
      '<div class="spinner"></div>'
    );
  }

  renderQuote(content, author) {
    this.quoteEl.textContent = `" ${content} "`;
    this.authorEl.textContent = author;
  }

  handleQuoteGenerate(handle) {
    this.reloadBtn.addEventListener('click', handle);

    handle();
  }
}

export default new QuoteView();
