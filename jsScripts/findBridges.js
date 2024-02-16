
// Function to find the "starting_point" and "bridges" that lead to the "ending_point" by using "Small World" card logic
function findBridges(){
    const deck = document.getElementById('deck');
    const deckViewer = document.getElementById('deck_viewer');
    const deckCards = deck.querySelectorAll('.selectedCard');
    const endingPoint = deck.querySelector('.ending_point');
    const bridgesDiv = document.getElementById('bridges');

    if (deckCards.length < 3) {
        alert('Please add to your deck at least 3 cards before trying to find bridges');
        return;
    }

    // Check if there is an "ending_point" card in the deck
    if (!endingPoint) {
        alert('Please select a card to add to the hand using "Small World"');
        return;
    }

    // Clear the bridges container
    bridgesDiv.innerHTML = '';

    // Access the form element
    const form = deckViewer.querySelector('form');
    
    // Get the ending point card data
    const endingPointId = endingPoint.querySelector('img').dataset.cardId;
    const endingPointCardData = JSON.parse(form.querySelector(`input[name='selectedCards[]'][value*='${endingPointId}']`).value);

    // Get all of the selected cards from the deck
    const selectedCards = [];
    deckCards.forEach((card) => {
        const cardId = card.querySelector('img').dataset.cardId;
        const cardData = JSON.parse(form.querySelector(`input[name='selectedCards[]'][value*='${cardId}']`).value);
        selectedCards.push(cardData);
    });

    // iter through the selected cards and find the paths to the ending point
    for (const startingCard of selectedCards) {
        if (startingCard.id != endingPointId) {
            for (const middleCard of selectedCards) {
                if (middleCard.id != startingCard.id && middleCard.id != endingPointId && areCardsBridgeable(startingCard, middleCard) && areCardsBridgeable(middleCard, endingPointCardData)) {
                    // add a bridge div to the bridgesDiv
                    const bridgeDiv = document.createElement('div');
                    bridgeDiv.classList.add('bridge');
                    // add the cards to the bridge div
                    bridgeDiv.appendChild(createCard(startingCard));
                    bridgeDiv.appendChild(addArrow());
                    bridgeDiv.appendChild(createCard(middleCard));
                    bridgeDiv.appendChild(addArrow());
                    bridgeDiv.appendChild(createCard(endingPointCardData));
                    bridgesDiv.appendChild(bridgeDiv); // Append the bridge to the bridges container
                }
            }
        }
    }
}


// function to check if 2 cards have exactly 1 of the same Type, Attribute, Level, ATK or DEF
function areCardsBridgeable(card1, card2) {
    // Counter for the number of matching properties
    let matchCount = 0;

    // Helper function to check if two properties are equal
    const checkPropertyEquality = (prop1, prop2) => {
        return prop1 === prop2;
    };

    // Array of properties to compare
    const propertiesToCompare = ['race', 'attribute', 'level', 'atk', 'def'];

    // Loop through each property
    for (const prop of propertiesToCompare) {
        // Check if the properties are equal
        if (checkPropertyEquality(card1[prop], card2[prop])) {
            matchCount++;
        }
    }

    // Check if exactly one property matches
    return matchCount === 1;
}

// Function to create a card element
function createCard(card) {
    // Create a new card element
    const cardElement = document.createElement('div');
    cardElement.classList.add('selectedCard');

    const imageName = (card.name.replace([':', '/'], '')) + '_' + (card.race) + '_' +
            (card.type) + '_lvl' + card.level + '_' + (card.attribute) + '.jpg';

    // Construct the image URL
    const imageUrl = 'card_database/cards_images/' + imageName;
    // Create an image element for the card
    const cardImage = document.createElement('img');
    
    cardImage.src = imageUrl;
    cardImage.alt = card.name;

    // Store the card ID in a data attribute
    cardImage.dataset.cardId = card.id;

    // Append the image and name to the card element
    cardElement.appendChild(cardImage);

    const newCard = document.createElement('div');
    newCard.classList.add('card');
    const newCardInfo = document.createElement('div');
    newCardInfo.classList.add('card-info');
    newCardInfo.appendChild(cardElement);
    newCard.appendChild(newCardInfo);

    return newCard;
}

// Add an arrow in between the cards to represent the bridge
function addArrow() {
    const arrow = document.createElement('img');
    arrow.src = 'img/arrow.png';
    arrow.classList.add('arrow');
    return arrow;
}