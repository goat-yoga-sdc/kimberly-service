# Project Name

> Glossier Mockup (Suggested Items Module)

## Related Projects

  - https://github.com/Dumpling-Squad/Reviews-module
  - https://github.com/Dumpling-Squad/nav-bar
  - https://github.com/Dumpling-Squad/product-description

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

Seeding File, from db folder directory:
```sh
npm run seed
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:
```sh
npm install -g webpack
npm install

npm start
npm run build
node db/mongo/seed.js
mongoimport --type csv -d suggestedItems -c MainSuggest --headerline --drop mainSuggest.csv
mongoimport --type csv -d suggestedItems -c QuickView --headerline --drop quickView.csv
mongoimport --type csv -d suggestedItems -c Shades --headerline --drop shades.csv
```

