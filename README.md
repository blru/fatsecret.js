<p align="center">
  <img height="96px" src="https://user-images.githubusercontent.com/44450511/192179431-d308972e-e7cc-4c39-ad80-fcf3efab206c.png" alt="fatsecret.js Logo" />
</p>
<p align="center">
  <a href="https://github.com/IDontLua/fatsecret.js">
      <img height="32px" alt="Github" title="Github" src="https://user-images.githubusercontent.com/44450511/192173294-eabfc83b-d8da-4251-bf23-152d73349fa0.png"/>
  </a>
  &#8287;&#8287;&#8287;&#8287;&#8287;
  <a href="https://quandale-henry-quavante.gitbook.io/fatsecertjs/">
      <img height="32px" alt="Docs" title="Docs" src="https://user-images.githubusercontent.com/44450511/192173296-f293fad2-eb27-43e2-b358-76ec7731c306.png"/>
  </a>
</p>

---

Fatsecret.js is an unofficial API wrapper for the FatSecret nutrition database.

## Highlights

- ✔ Full OAuth2 support
- ✔ Fully defined types
- ✔ Classes & helper methods for responses
- ✔ Automatic access token refreshing

## Installation

```console
# npm
npm install --save-dev fatsecret.js

# yarn
yarn add fatsecret.js

```

## Basic Usage

Simple example of getting a food with id `1234` and logging it to the console.

```ts
// initialize new client
const client = new FatSecret.Client({
  credentials: {
    clientId: 'fatsecret client id',
    clientSecret: 'fatsecret client secret',
    scope: ['premier', 'barcode'], // your scopes
  },
});

// get food with id
const foundFood = await client.getFood({ foodId: '1234' });

console.log(foundFood); // Food {id: '1234'...}
```

> 📌 Only 4 food related methods currently supported.
