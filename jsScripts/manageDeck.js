// jsScripts/addToDeck.js

function addToDeck(card, imageUrl) {
    // Access the deck viewer section
    const deckViewer = document.getElementById('deck_viewer');

    // Check if the card is already in the deck
    const isCardInDeck = isCardAlreadyInDeck(card);

    if (isCardInDeck) {
        return;
    }

    // Create a new card element
    const cardElement = document.createElement('div');
    cardElement.classList.add('selectedCard');

    // Create an image element for the card
    const cardImage = document.createElement('img');
    cardImage.src = imageUrl;
    cardImage.alt = card.name;

    // Store the card ID in a data attribute
    cardImage.dataset.cardId = card.id;

    // Append the image and name to the card element
    cardElement.appendChild(cardImage);

    // Append the card element to the deck
    const deck = document.getElementById('deck');
    deck.appendChild(cardElement);

    // Store the selected card data in a hidden input field for further processing
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'selectedCards[]';
    hiddenInput.value = JSON.stringify(card);

    // Access the form element
    const form = deckViewer.querySelector('form');

    // Append the hidden input to the form
    form.appendChild(hiddenInput);

    // Add a right-click event listener to the card for removal
    cardElement.addEventListener('contextmenu', function (event) {
        event.preventDefault(); // Prevent the default right-click context menu
        removeFromDeck(cardElement);
    });
}

// Function to check if a card is already in the deck
function isCardAlreadyInDeck(card) {
    const deck = document.getElementById('deck');
    const deckCards = deck.querySelectorAll('.selectedCard img');

    for (const cardImage of deckCards) {
        const deckCardId = cardImage.dataset.cardId;

        if (deckCardId === card.id.toString()) {
            return true; // Card is already in the deck
        }
    }

    return false; // Card is not in the deck
}

// Function to remove a card from the deck
function removeFromDeck(cardElement) {
    const deck = document.getElementById('deck');
    deck.removeChild(cardElement);
}
