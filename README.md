#yugioh Small World calculator

we get the json file and download images in batch from
"https://db.ygoprodeck.com/api/v7/cardinfo.php/type=Effect Monster"
and
"https://db.ygoprodeck.com/api/v7/cardinfo.php/type=Normal Monster"

```npm stripJSON.js``` to get the file cardinfoStripped.php.json with only the necessary content of the original cardinfo.php.json file
```npm getImages.js``` to get the images