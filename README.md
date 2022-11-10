# 📚 Casebound

Visualize your digital bookshelves!

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dejohansson_casebound&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dejohansson_casebound)

## Integrations

| Platform                                     | Status | Notes                                                                                                                                                                   |
|----------------------------------------------|:------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Literal](https://literal.club/)             |   ✔   |                                                                                                                                                                         |
| [Open Library](https://openlibrary.org/)     |   🚧   |                                                                                                                                                                         |
| [Goodreads](https://www.goodreads.com/)      |   ❌   | [Goodreads no longer issues new developer keys for their public API.](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs)                      |
| [StoryGraph](https://www.thestorygraph.com/) |   ❌   | As of 2022-06-26, StoryGraph does not offer a public API. Follow the development over at their [feature page](https://roadmap.thestorygraph.com/features/posts/an-api). |

Legend: ✔ - _Supported_, 🚧 - _Under development_, ❌ - _Not supported_

## Development

Clone and navigate to the repository.

``` sh
git clone https://github.com/dejohansson/casebound.git
```

``` sh
cd ./casebound
```

Create local development environment varibles from the provided sample. Make sure to replace any placeholder values copied to `.env.development.local`.

``` sh
cp ./sample.env ./.env.development.local
```

Install latest npm dependencies.

``` sh
npm install
```

Start development server.

``` sh
npm run dev
```
