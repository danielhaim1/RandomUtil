RandomUtil
==========

[![npm version](https://img.shields.io/npm/v/@danielhaim/randomutil)](https://www.npmjs.com/package/@danielhaim/randomutil)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/randomutil.svg)](https://www.npmjs.com/package/@danielhaim/randomutil)
![GitHub](https://img.shields.io/github/license/danielhaim1/randomutil)

Overview
--------

The `RandomUtil` module, accessible as an NPM package in both `amd` and `commonjs` configurations, expedites the prototyping of web interfaces. It adeptly fills `DOM` elements with a variety of random content. The module's versatility extends to numerous data types, encompassing text (encompassing titles, tags, and excerpts), images, tailored dates, and SVG-crafted avatars.

[CodePen Demo](https://codepen.io/danielhaim/pen/BabKOBK/ef5e3e519c58b082797b3fc6b1b744c0)

API Documentation
--------------------

To initiate, install `RandomUtil` using NPM:

```shell
npm i @danielhaim/randomutil
```

### Module Example ###

```js
import RandomUtil from "@danielhaim/randomutil";

const randomContentManager = new RandomUtil.RandomContentManager(1);
const randomUtilController = new RandomUtil.RandomUtilController();

// Content Generation
randomController.randomTag(randomContent.randomTags);
randomController.randomTitle(randomContent.randomTitles);
randomController.randomExcerpt(randomContent.randomExcerpts);

// Date & Time Generation
randomController.randomReadTime();
randomController.randomDate("Y/m/d");

const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; 
// Register API: [Unsplash API](https://unsplash.com/documentation#getting-started)
// Alternatively, you can use the `.env` file.

const imageCount = document.querySelectorAll("[data-random='img']").length;

// Image Generation
randomUtilController.randomImages({
  count: imageCount,
  query: "nature",
  orientation: "portrait",
  accessKey: UNSPLASH_ACCESS_KEY
});

// Avatar Generation
randomUtilController.randomAvatar({ 
  options: { 
    variant: "default" // Options: ['pixel', 'abstract', 'smile']
  } 
});
```

### Browser Example ###

```html
<script src="./path/to/dist/randomutil.amd.js"></script>
<script>
const randomContent = new window.RandomUtil.RandomContentManager(1);
const randomController = new window.RandomUtil.RandomUtilController();
// ...
</script>
```

### `RandomContentManager()` ###

1. The `RandomContentManager()` manages content distribution from a set of five arrays, while `RandomUtil.Controller()` handles the distribution of this content. Each array focuses on distinct themes
    1. `Array 1`: Wildlife preservation and conservation content.
    2. `Array 2`: Global explorations and adventures.
    3. `Array 3`: Technology and innovation topics.
    4. `Array 4`: Fashion and beauty-related content.
    5. `Array 5`: Creative and advertising materials.

```js
// Initialize a RandomContentManager for Array 3 (Technology and Innovation)
const randomContent = new RandomContentManager(3);

// Initialize RandomUtil.Controller for content distribution
const randomController = new RandomUtil.Controller();

// Generate and populate elements with content:
randomController.generateTag(randomContentManager.tags); // For `[data-random="tag"]` elements
randomController.generateTitle(randomContentManager.titles); // For `[data-random="title"]` elements
randomController.generateExcerpt(randomContentManager.excerpts); // For `[data-random="excerpt"]` elements
```

### `RandomUtil.Controller()` ###
  
The `RandomUtil.Controller()` is in charge of content distribution and offers several methods to target specific `DOM` elements:

| Method                              | Target Element                  | Output                                      |
|-------------------------------------|---------------------------------|---------------------------------------------|
| `randomTitles(titles)`              | `[data-random="title"]`         | Randomly selects and populates title elements. |
| `randomTags(tags)`                  | `[data-random="tag"]`           | Assigns random tags to elements.             |
| `randomExcerpts(excerpts)`          | `[data-random="excerpt"]`       | Fills elements with random excerpts.         |
| `randomReadTime(text = 'min read')` | `[data-random="read-time"]`     | Generates read time content (e.g., "8 min read"). |
| `randomDate(format)`                | `[data-random="date"]`          | Provides random dates in the specified format (default: `M j, Y`, e.g., Dec 21, 2019). |
| `randomDate`                        | `[data-random-date="l, F jS, Y"]` | Custom date format support (e.g., "Saturday, December 21st, 2019"). |
| `randomImages({ count, query, orientation, accessKey })` | `[data-random="img"]` | Fetches random images (requires Unsplash API Key). |
| `randomImages({})`                 | `[data-random-img="person, face"]` | Advanced image querying for specific elements. |
| `randomAvatar({ avatarOptions })`   | `[data-random="avatar"]`        | Provides random avatars with options like 'pixel', 'smile', or 'abstract'. |
| `randomAvatar({ avatarOptions })`   | `[data-random-avatar="pixel"]`  | More advanced avatar customization.          |

```js
// Initialize a RandomContentManager for Array 1 (Wildlife preservation and conservation content)
const randomContent = new RandomContentManager(1);

// Initialize RandomUtil.Controller for content distribution
const randomController = new RandomUtil.Controller();
randomController.randomTag(randomContent.randomTags); // For `[data-random="tag"]` elements
randomController.randomTitle(randomContent.randomTitles); // For `[data-random="title"]` elements
randomController.randomExcerpt(randomContent.randomExcerpts); // For `[data-random="excerpt"]` elements
randomController.randomReadTime(); // For `[data-random="time"]` elements

randomController.randomDate("Y/m/d"); // For `[data-random="date"]` or `[data-random-date]` elements

// For `[data-random="img"]` and `[data-random-img]` elements
const randomImageCount = document.querySelectorAll("[data-random='img']").length;
randomController.randomImages({ 
    count: randomImageCount, // for caching the API
    query: "nature",
    orientation: "portrait",
    accessKey: UNSPLASH_ACCESS_KEY 
});

// For `[data-random="avatar"]` and `[data-random-avatar]` elements
randomController.randomAvatar({ 
    avatarOptions: { 
      colors: ["#FF5733", "#33FF57", "#5733FF"], // Optional color set
      variant: "default"
    }
});
```

### `randomDate()` ###

The `randomDate()` method is designed to populate elements with `[data-random="date"]` and `[data-random-date=""]` attributes. Utilizing the `[data-random-date]` attribute, you gain access to more specific date formats, such as `l, F jS, Y`, which results in a formatted date like "Saturday, December 21st, 2019." This flexibility allows you to tailor the date presentation to your specific needs.

| **Category** | **Format** | **Description** | **Example** |
|---|---|---|---|
| Day of Month |
| d | Numeric, with leading zeros | 01–31 | 01–31 |
| j | Numeric, without leading zeros | 1–31 | 1–31 |
| S | The English suffix for the day of the month | st, nd or th in the 1st, 2nd or 15th | st, nd or th in the 1st, 2nd or 15th |
| Weekday |
| l | Full name (lowercase ‘L’) | Sunday – Saturday | Sunday – Saturday |
| D | Three letter name | Mon – Sun | Mon – Sun |
| Month |
| m | Numeric, with leading zeros | 01–12 | 01–12 |
| n | Numeric, without leading zeros | 1–12 | 1–12 |
| F | Textual full | January – December | January – December |
| M | Textual three letters | Jan – Dec | Jan – Dec |
| Year |
| Y | Numeric, 4 digits | Eg., 1999, 2003 | Eg., 1999, 2003 |
| y | Numeric, 2 digits | Eg., 99, 03 | Eg., 99, 03 |
| Time |
| a | Lowercase | am, pm | am, pm |
| A | Uppercase | AM, PM | AM, PM |
| g | Hour, 12-hour, without leading zeros | 1–12 | 1–12 |
| h | Hour, 12-hour, with leading zeros | 01–12 | 01–12 |
| G | Hour, 24-hour, without leading zeros | 0-23 | 0-23 |
| H | Hour, 24-hour, with leading zeros | 00-23 | 00-23 |
| i | Minutes, with leading zeros | 00-59 | 00-59 |
| s | Seconds, with leading zeros | 00-59 | 00-59 |
| T | Timezone abbreviation | Eg., EST, MDT … | Eg., EST, MDT … |
| Full Date/Time |
| c | ISO 8601 | 2004-02-12T15:19:21+00:00 | 2004-02-12T15:19:21+00:00 |
| r | RFC 2822 | Thu, 21 Dec | Thu, 21 Dec |
| U | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) | 1577836800 | 1577836800 |
| M jS, Y | Custom | Dec 21st, 2019 | Dec 21st, 2019 |
| l, F jS, Y | Custom | Saturday, December 21st, 2019 | Saturday, December 21st, 2019 |

```js
// Initialize RandomUtil.Controller for content distribution
const randomController = new RandomUtil.Controller();
randomController.randomDate("Y/m/d");
```

```html
<!-- Input -->
<span data-random="date"></span>
<span data-random-date="M jS, Y"></span>

<!-- Output -->
<span>2019/01/21</span>
<span>Dec 21st, 2019</span>
```

### `randomImages()` ###

This method allows you to fetch images from the Unsplash API. To get started, you can register an Unsplash Application and grab your access key [here](https://unsplash.com/oauth/applications).

1. The `randomImages({ count, query, orientation, accessKey })` constructor:
  1. `count` (Optional): Number of images to fetch. Default is 12.
  2. `query` (Optional): The category of images. Default is "nature".
  3. `orientation` (Optional): The orientation of the images. Default is "landscape".
  4. `accessKey` (Optional): Your Unsplash API key. If not provided, it will default to process.env.UNSPLASH_ACCESS_KEY.

```js
const UNSPLASH_ACCESS_KEY = 'your-api-key';

const randomController = new RandomUtil.Controller();
const randomImageCount = document.querySelectorAll("[data-random='img']").length;

randomController.randomImages({ 
    count: randomImageCount, // for caching the API
    query: "nature",
    orientation: "portrait",
    accessKey: UNSPLASH_ACCESS_KEY 
});
```

```html
<img data-random="img" />
<img data-random="img" data-random-img="person, face" />
<img data-random="img" data-random-img="school bus" />
```

### `randomAvatar({})` ###

The `randomAvatar` method offers the functionality to create diverse and customizable avatars. This implementation draws inspiration from a modified version of [Boring Avatars](https://github.com/boringdesigners/boring-avatars) in vanilla JavaScript.

```js
const randomController = new RandomUtil.Controller();

randomController.randomAvatar({ 
    avatarOptions: { 
      colors: ["#FF5733", "#33FF57", "#5733FF"],
      variant: "default" // ["smile", "pixel", "abstract"]
    }
});
```

License
-------

This software is released under the [MIT License](LICENSE)

Report Issues or Request a Feature
----------------------------------

If you encounter any issues or have suggestions for improvements, please feel free to report them. Your feedback is invaluable in enhancing this software.

Folder Structure
----------------

Here's an overview of the project's folder structure:

```bash
├── .env
├── .gitattributes
├── .gitignore
├── .nvmrc
├── LICENSE
├── README.md
├── __test__
│   └── randomutil.amd.test.js
├── babel.config.js
├── dist
│   ├── randomutil.amd.js
│   └── randomutil.module.js
├── index.js
├── jest.config.js
├── package.json
├── sets
│   └── palette.json
├── src
│   ├── index.js
│   ├── util.avatar.js
│   ├── util.content.js
│   ├── util.date.js
│   └── util.image.js
└── webpack.config.js
```