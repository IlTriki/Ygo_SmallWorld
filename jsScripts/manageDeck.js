// Function to add a card to the deck
function addCardToDeck(card, imageUrl, fromStorage = false) {
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
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    const newCardInfo = document.createElement('div');
    newCardInfo.classList.add('card-info');
    newCardInfo.appendChild(cardElement);
    newCard.appendChild(newCardInfo);
    deck.prepend(newCard);
    if (!fromStorage) {
        deck.removeChild(deck.lastChild);
    }

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

    // Add a left-click event listener to the card for the "ending_point" identifier
    cardElement.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default click behavior

        // Remove the "ending_point" identifier from all cards in the deck
        const deckCards = deck.querySelectorAll('.selectedCard');
        deckCards.forEach((card) => {
            card.parentElement.parentElement.classList.remove('ending_point');
        });

        // Add the "ending_point" identifier to the clicked card
        cardElement.parentElement.parentElement.classList.add('ending_point');
    });

    const deckData = getDeckFromLocalStorage();
    deckData.push(card);
    saveDeckToLocalStorage(deckData);
}

// Function to add a card to the deck
function addToDeck(card, imageUrl) {
    addCardToDeck(card, imageUrl);
}

// Function to add a card to the deck from local storage
function addToDeckFromStorage(card, imageUrl) {
    addCardToDeck(card, imageUrl, true);
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
    const form = document.getElementById('deck_viewer').querySelector('form');

    // Find the card ID associated with the cardElement
    const cardId = cardElement.querySelector('img').dataset.cardId;

    // Find the hidden input based on the card ID
    const hiddenInput = form.querySelector(`input[name='selectedCards[]'][value*='${cardId}']`);

    if (hiddenInput) {
        form.removeChild(hiddenInput);
        deck.removeChild(cardElement.parentElement.parentElement);
        // Remove the card data from the deckData array
        const deckData = getDeckFromLocalStorage();
        const updatedDeckData = deckData.filter((card) => card.id.toString() !== cardId);
        saveDeckToLocalStorage(updatedDeckData);
        addUnremovableCard(deck);
    }
}

// Function to add unremovable cards to the deck
function addUnremovableCard(deck) {
    const unremovableCard = document.createElement('div');
    unremovableCard.classList.add('card', 'unremovable');
    const unremovableCardInfo = document.createElement('div');
    unremovableCardInfo.classList.add('card-info');
    unremovableCard.appendChild(unremovableCardInfo);
    deck.append(unremovableCard);
} 

// Function to retrieve deck data from localStorage
function getDeckFromLocalStorage() {
    const deckData = localStorage.getItem('deckData');
    return deckData ? JSON.parse(deckData) : [];
}

// Function to save deck data to localStorage
function saveDeckToLocalStorage(deckData) {
    localStorage.setItem('deckData', JSON.stringify(deckData));
}

// Function to populate the deck on page load
function populateDeckFromLocalStorage() {
    // Get deck data from local storage
    const deckData = getDeckFromLocalStorage();
    const deck = document.getElementById('deck');

    // Add cards from local storage to the deck
    for (const card of deckData) {
        // Generate the image file name based on the specified format
        const imageName = (card['name'].replace([':', '/'], '')) + '_' + (card['race']) + '_' +
            (card['type']) + '_lvl' + card['level'] + '_' + (card['attribute']) + '.jpg';

        // Construct the image URL
        const imageUrl = 'card_database/cards_images/' + imageName;
        addToDeckFromStorage(card, imageUrl);
    }
    // Add unremovable cards to fill the deck
    const unremovableCardsToAdd = 40 - deckData.length;
    for (let i = 0; i < unremovableCardsToAdd; i++) {
        addUnremovableCard(deck);
    }
    
    // Save the deck data back to local storage
    saveDeckToLocalStorage(deckData);
}

// Call the function to populate the deck on page load
populateDeckFromLocalStorage();