document.addEventListener('click', function(event) {
    const cardSearcher = document.getElementById('card_searcher');
    const isClickedOutside = !cardSearcher.contains(event.target);
    if (isClickedOutside) {
        cardSearcher.style.visibility = 'hidden';
    }
});