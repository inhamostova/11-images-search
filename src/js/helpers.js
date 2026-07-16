function showEl(el) {
  el.classList.remove('is-hidden');
}

function hideEl(el) {
  el.classList.add('is-hidden');
}

export { showEl, hideEl };
