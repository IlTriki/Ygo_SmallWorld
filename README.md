<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Ygo_SmallWorld" />

  &#xa0;
</div>

<h1 align="center">Ygo_SmallWorld</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/IlTriki/ygo_smallworld?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/IlTriki/ygo_smallworld?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/IlTriki/ygo_smallworld?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/IlTriki/ygo_smallworld?color=56BEB8">
</p>

## Status

<h4 align="center"> 
	🚧  Ygo_SmallWorld 🚀 Under construction...  🚧
</h4> 

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/IlTriki" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

Ygo_SmallWorld is a project designed to assist Yu-Gi-Oh! trading card game players in optimizing their decks by leveraging the power of Small World.\
The tool provides functionality to search for monsters in your deck and add them to a list calculator.\
Additionally, it allows you to choose a specific monster from your deck that needs to be added with Small World, calculating all possible paths to enhance your strategy.\
\
This project aims to streamline the deck-building process, making it easier for players to identify the most effective combinations of monsters with Small World, ultimately enhancing their gameplay experience.\
Here is the card for reference :\
<img alt="Small World" src="https://ms.yugipedia.com//b/b3/SmallWorld-RA01-EN-SR-1E.png" width="350">

## :sparkles: Features ##

:heavy_check_mark: Search the monsters of your deck and add them to the list calculator;\
:heavy_check_mark: Choose the monster from your deck that needs to be added with Small World and calculate all paths;

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [PHP](https://www.php.net/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/IlTriki/ygo_smallworld

# Access
$ cd ygo_smallworld

# We get the json file and download images in batch from :
# "https://db.ygoprodeck.com/api/v7/cardinfo.php/type=Effect%20Monster"
# "https://db.ygoprodeck.com/api/v7/cardinfo.php/type=Normal%20Monster"

# The cards have to be downloaded and stored locally to avoid stress on their server
# Do not try to hotlink images from the site or you'll get IP  blacklisted ( more information on : https://ygoprodeck.com/api-guide/ )

npm stripJSON.js # to get the file cardinfoStripped.php.json with only the necessary content of the original cardinfo.php.json file
npm getImages.js # to get the images
```

Made with :heart: by <a href="https://github.com/IlTriki" target="_blank">TRIKI Osama</a>

&#xa0;

<a href="#top">Back to top</a>