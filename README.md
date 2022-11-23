# 📚 Casebound

Visualize your digital bookshelves!

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dejohansson_casebound&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dejohansson_casebound)

## Integrations

|                                                                    | Platform                                      | Status | Notes                                                                                                                                                                   |
|--------------------------------------------------------------------|-----------------------------------------------|:------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="./resources/literal-logo.png" alt="logo" width="22"/>    | [Literal](https://literal.club/)              |   ✔    |                                                                                                                                                                         |
|                                                                    | [Open&#160;Library](https://openlibrary.org/) |   🚧   |                                                                                                                                                                         |
| <img src="./resources/goodreads-logo.png" alt="logo" width="22"/>  | [Goodreads](https://www.goodreads.com/)       |   ❌   | [Goodreads no longer issues new developer keys for their public API.](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs)                      |
| <img src="./resources/storygraph-logo.png" alt="logo" width="14"/> | [StoryGraph](https://www.thestorygraph.com/)  |   ❌   | As of 2022-06-26, StoryGraph does not offer a public API. Follow the development over at their [feature page](https://roadmap.thestorygraph.com/features/posts/an-api). |

Legend: ✔ - _Supported_, 🚧 - _Under development_, ❌ - _Not supported_

## Build

Clone and navigate to the repository.

``` sh
git clone https://github.com/dejohansson/casebound.git
```

``` sh
cd ./casebound
```

Install the latest npm dependencies.

``` sh
npm install
```

Build and package as a web app.

``` sh
npm run build:web
```

Build and package as a [Lively wallpaper](https://github.com/rocksdanister/lively).

``` sh
npm run build:lively
```

The build files can be found in the `dist` folder.

## Development

Clone and navigate to the repository.

``` sh
git clone https://github.com/dejohansson/casebound.git
```

``` sh
cd ./casebound
```

Install the latest npm dependencies.

``` sh
npm install
```

Start the development server as a web app

``` sh
npm run dev:web
```

or as a lively wallpaper

``` sh
npm run dev:lively
```
