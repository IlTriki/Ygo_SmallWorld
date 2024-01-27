<?php
function searchCards($matchingCards)
{
    // Display the matching cards
    foreach ($matchingCards as $card) {
        // Generate the image file name based on the specified format
        $imageName = (str_replace([':', '/'], '', $card['name'])) . '_' . ($card['race']) . '_' .
            ($card['type']) . '_lvl' . $card['level'] . '_' . ($card['attribute']) . '.jpg';

        // Construct the image URL
        $imageUrl = 'card_database/cards_images/' . $imageName;

        // Display the image
        echo '<div id="card_result">';
        echo '<button class="addCard">';
        echo '<img src="' . $imageUrl . '" alt="' . $card['name'] . '">';
        echo '<p> ' . $card['name'] . '</p>';
        echo '</button> </div>';
    }
}
