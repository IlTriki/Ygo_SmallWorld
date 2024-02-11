<?php
function displayPagination($matchingCards, $cardsPerPage, $searchTerm)
{
    $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;

    // Calculate total pages
    $totalPages = ceil(count($matchingCards) / $cardsPerPage);

    // Show a maximum of 2 prior pages and 4 next pages
    $startPage = max(1, $currentPage - 2);
    $endPage = min($totalPages, $currentPage + 4);
    echo '<button id="page_number" onclick="window.location.href=\'?page=1&search=' . urlencode($searchTerm) . '\'"> << </button>';
    for ($i = $startPage; $i <= $endPage; $i++) {
        echo '<button id="page_number" onclick="window.location.href=\'?page=' . $i . '&search=' . urlencode($searchTerm) . '\'"><span>' . $i . '</span></button>';
    }
    echo '<button id="page_number" onclick="window.location.href=\'?page=' . $totalPages . '&search=' . urlencode($searchTerm) . '\'"> >> </button>';
}
?>
