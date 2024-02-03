<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Small world calculator</title>
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
        <h1>Small world calculator</h1>
        <section id="deck_viewer">
            <form method="POST" id="deckForm">
                <div id="deck">
                </div>
            </form>
            <div>
                <button id="clearBtn" onclick="clearDeck()">Clear</button>
                <button id="calculateBtn">Find Bridges</button>
            </div>
            <div id="bridges">
            </div>
        </section>
        <section id="card_searcher">
            <div>
                <div id="search_bar">
                    <form method="GET">
                        <input type="text" id="search" name="search" placeholder="Insert card's name..."
                            value="<?= htmlspecialchars($searchTerm) ?>">
                        <input type="submit" value="Search" id="searchBtn">
                    </form>
                </div>
                <div id="results">
                    <?php
                        if ($searchTerm != '') {
                            searchCards($matchingCardsPage);
                            if (sizeof($matchingCards) == 0){
                                echo '<h2>No results found</h2>';
                            }
                        
                    ?>
                </div>
                <div id="pagination">
                    <?php
                        displayPagination($matchingCards, $cardsPerPage, $searchTerm);
                        }
                    ?>
                </div>
            </div>
        </section>
    </body>
    <script src="jsScripts/manageDeck.js"></script>
    <script src="jsScripts/clearDeck.js"></script>
</html>
