function clearDeck() {
    const deck = document.getElementById("deck");
    const form = document.getElementById('deck_viewer').querySelector('form');

    // Clear the visual representation of the deck
    deck.innerHTML = "";

    // Clear hidden inputs
    const hiddenInputs = form.querySelectorAll("input[name='selectedCards[]']");
    hiddenInputs.forEach((input) => {
        form.removeChild(input);
    });

    // Clear local storage
    localStorage.removeItem('deckData');
}
