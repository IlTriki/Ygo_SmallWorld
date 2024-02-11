<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Small World Calculator</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <?php
            // Include the functions
            require_once 'functions/search.php';
            require_once 'functions/pageDivider.php';

            // search if set
            $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

            // Load the JSON file
            $jsonFile = file_get_contents('card_database/cardinfoStripped.php.json');
            $data = json_decode($jsonFile, true);

            // Search for matching cards
            $matchingCards = array_filter($data['data'], function ($card) use ($searchTerm) {
                return strpos(strtolower($card['name']), strtolower($searchTerm)) !== false;
            });

            // Set the number of cards per page
            $cardsPerPage = 20;

            // Paginate the results
            $offset = ($currentPage - 1) * $cardsPerPage;
            $matchingCardsPage = array_slice($matchingCards, $offset, $cardsPerPage);

        ?>
        <header>
            <h1>Small World Calculator</h1>
            <div class="input__container">
                <div class="shadow__input"></div>
                <form method="GET" class="input__container">
                    <button class="input__button__shadow">
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                        <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="rgb(212, 206, 206)"></path>
                        </svg>
                    </button>
                    <input type="text" class="input__search" id="search"
                        name="search" placeholder="Insert card's name..."
                        value="<?= htmlspecialchars($searchTerm) ?>">
                </form>
            </div>
        </header>
        <section id="card_searcher">
            <div id="results">
                <?php
                    if ($searchTerm != '') {
                        // make the div visible
                        echo '<style> #card_searcher { visibility : visible; } </style>';
                        searchCards($matchingCardsPage);
                    
                ?>
            </div>
            <div id="pagination">
                <?php
                    displayPagination($matchingCards, $cardsPerPage, $searchTerm);
                    }
                ?>
            </div>
        </section>
        <section id="deck_viewer">
            <div id="title">
                <h2>DECK</h2>
            </div>
            <form method="POST" id="deckForm">
                <div id="deck">
                </div>
            </form>
            <div id="deckButtons">
                <button class="deckButton" onclick="clearDeck()">Clear</button>
                <button class="deckButton" onclick="findBridges()">Find Bridges</button>
            </div>
            <div id="bridges">
            </div>
    </body>
    <script src="jsScripts/manageDeck.js"></script>
    <script src="jsScripts/clearDeck.js"></script>
    <script src="jsScripts/manageSearchSpace.js"></script>
    <script src="jsScripts/findBridges.js"></script>
</html>
