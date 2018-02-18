<!-- {{Top}} -->
# StarCorn
[![Greenkeeper badge](https://badges.greenkeeper.io/JoshuakGoldberg/StarCorn.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/JoshuakGoldberg/StarCorn.svg?branch=master)](https://travis-ci.org/JoshuakGoldberg/StarCorn)
[![NPM version](https://badge.fury.io/js/starcorn.svg)](http://badge.fury.io/js/starcorn)

Fly through the galaxy! Eat your vegetables!
<!-- {{/Top}} -->

## Usage

The built `src/index.html` uses [UserWrappr](https://github.com/JoshuakGoldberg/UserWrappr) to fill the available window size with a game screen, option menus, and piped input events.
It stores its generated instance as `window.FSP`.

To do this in your own page, use the exported `createStarCornInterface` function.

```javascript
import { createStarCornInterface } from "StarCorn";

createStarCornInterface(document.getElementById("game"))
    .then(() => {
        console.log("Ready to play!");
        console.log(FSP);
    });
```

You can also directly create a new `StarCorn` instance with a manual size.

```javascript
import { StarCorn } from "starcorn";

// Creates a new game with a 320x480 screen size
const fsp = new StarCorn({
    height: 320,
    width: 480,
});

// Games contain a .canvas member for the screen
document.body.appendChild(fsp.canvas);

// Shows the initial in-game menu with start and load options
fsp.gameplay.gameStart();
```

> By default, the game doesn't set up input events.
> You'll need to set up your own event registrations manually.

### Documentation

StarCorn is built on top of [GameStartr](https://github.com/FullScreenShenanigans/GameStartr), a modular TypeScript game engine split across separate projects available on npm and hosted on GitHub in the [JoshuakGoldberg](https://github.com/FullScreenShenanigans) organization.
It consists of a couple dozen core modules under this organization.

<!-- {{Development}} -->
## Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo/):

```
git clone https://github.com/<your-name-here>/StarCorn
cd StarCorn
npm install
npm run setup
npm run verify
```

* `npm run setup` creates a few auto-generated setup files locally.
* `npm run verify` builds, lints, and runs tests.

### Building

```shell
npm run watch
```

Source files are written under `src/` in TypeScript and compile in-place to JavaScript files.
`npm run watch` will directly run the TypeScript compiler on source files in watch mode.
Use it in the background while developing to keep the compiled files up-to-date.

### Running Tests

```shell
npm run test
```

Test files are alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `npm run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests.
`npm run test:run` will run that setup and execute tests using [Puppeteer](https://github.com/GoogleChrome/puppeteer).
<!-- {{/Development}} -->
