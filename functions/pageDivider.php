<?php
function displayPagination($matchingCards, $cardsPerPage, $searchTerm)
{
    $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;

    // Calculate total pages
    $totalPages = ceil(count($matchingCards) / $cardsPerPage);

    // Show a maximum of 5 prior pages and 5 next pages
    $startPage = max(1, $currentPage - 5);
    $endPage = min($totalPages, $currentPage + 5);

    for ($i = $startPage; $i <= $endPage; $i++) {
        echo '<a id="page_number" href="?page=' . $i . '&search=' . urlencode($searchTerm) . '">' . $i . '</a>';
    }
}
?>
