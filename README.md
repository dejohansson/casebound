# 📚 Casebound

Visualize your digital bookshelves!

## Development

Clone and navigate to the repository.

``` bash
git clone https://github.com/dejohansson/casebound.git

cd ./casebound
```

Create local development environment varibles from the provided sample. Make sure to replace any placeholder values copied to `.env.development.local`.

``` bash
cp ./sample.env ./.env.development.local
```

Install latest npm dependencies.

``` bash
npm install
```

Start development server.

``` bash
npm run dev
```

## Integrations

| Platform                                     | Status | Note                                                                                                                                                                    |
|----------------------------------------------|:------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Literal](https://literal.club/)             |   🚧   |                                                                                                                                                                         |
| [Goodreads](https://www.goodreads.com/)      |   ❌   | [Goodreads no longer issues new developer keys for their public API.](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs)                      |
| [StoryGraph](https://www.thestorygraph.com/) |   ❌   | As of 2022-06-26, StoryGraph does not offer a public API. Follow the development over at their [feature page](https://roadmap.thestorygraph.com/features/posts/an-api). |

Legend: ✔ - Supported, 🚧 - Under development, ❌ - Not implemented
