<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Small world calculator</title>
        <link rel="stylesheet" href="style.css">
        <script src="jsScripts/selectedImages.js" ></script>
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

            // Clicked cards
            $selectedCards = array();
        ?>
        <h1>Small world calculator</h1>
        <section>
            <div id="search_bar">
                <form method="GET">
                    <input type="text" id="search" name="search" placeholder="Search cards..."
                        value="<?= htmlspecialchars($searchTerm) ?>">
                    <input type="submit" value="Search" id="searchBtn">
                </form>
            </div>
            <div id="results">
                <?php
                    searchCards($matchingCardsPage);
                ?>
            </div>
            <div id="pagination">
                <?php
                    displayPagination($matchingCards, $cardsPerPage, $searchTerm);
                ?>
            </div>
            <div id="deck">
                <!-- selected cards -->
                <?php
                    if (sizeof($selectedCards) > 0){
                        echo '<h2>Selected monsters</h2>';
                        echo '<ul>';
                        foreach ($selectedCards as $card) {
                            echo '<li>' . $card . '</li>';
                        }
                        echo '</ul>';
                    }
                ?>
            </div>
            <div>
                <button id="clearBtn">Clear</button>
            </div>
            <div>
                <button id="calculateBtn">Find Bridges</button>
                <div id="bridges">
                
                </div>
            </div>

        </section>
    </body>
</html>
