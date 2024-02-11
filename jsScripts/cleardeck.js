function clearDeck() {
    const deck = document.getElementById("deck");
    const form = document.getElementById('deck_viewer').querySelector('form');
    const bridges = document.getElementById('bridges');

    // Clear deck
    deck.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        deck.innerHTML += '<div class="card unremovable"><div class="card-info"></div></div>';
    }

    // Clear hidden inputs
    const hiddenInputs = form.querySelectorAll("input[name='selectedCards[]']");
    hiddenInputs.forEach((input) => {
        console.log(input);
        form.removeChild(input);
    });

    // Clear local storage
    localStorage.removeItem('deckData');

    // Clear bridges
    bridges.innerHTML = "";
}
