function showEl(el) {
  el.classList.remove('is-hidden');
}

function hideEl(el) {
  el.classList.add('is-hidden');
}

function smoothScrollAfterLoadImages(el) {
  const { height } = el.getBoundingClientRect();

  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}

export { showEl, hideEl, smoothScrollAfterLoadImages };
