<?php
function displayPagination($matchingCards, $cardsPerPage, $searchTerm)
{
    $totalPages = ceil(count($matchingCards) / $cardsPerPage);

    for ($i = 1; $i <= $totalPages; $i++) {
        echo '<a id = "page_number" href="?page=' . $i . '&search=' . urlencode($searchTerm) . '">' . $i . '</a>';
    }
}
?>
