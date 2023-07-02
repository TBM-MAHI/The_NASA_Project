### The_NASA_SpaceX_Project

## Installation

##### Run the following commands to run this project on localhost

```sh
git clone https://github.com/TBM-MAHI/The_NASA_Project/
```
```sh
cd The_NASA_Project
```
```sh
npm install
```
##### Migrate the knexfile.js to setup database model In MySQL
```sh
npx knex migrate:latest --knexfile ./src/knexfile.ts
```
##### Run the Project
```sh
npm run watch
```
