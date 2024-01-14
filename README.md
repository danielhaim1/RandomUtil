# RandomUtil API

[![npm version](https://img.shields.io/npm/v/@danielhaim/randomutil)](https://www.npmjs.com/package/@danielhaim/randomutil)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/randomutil.svg)](https://www.npmjs.com/package/@danielhaim/randomutil)
![GitHub](https://img.shields.io/github/license/danielhaim1/randomutil)

Overview
--------

<a target="_blank" href="https://codepen.io/danielhaim/pen/BabKOBK/ef5e3e519c58b082797b3fc6b1b744c0">
    <img src="https://raw.githubusercontent.com/danielhaim1/randomutil/main/demo/demo.png" width="100%" height="auto" alt="RandomUtil">
</a>

# RandomUtil API Documentation  

`RandomUtil` is an NPM package for easily populating `DOM` elements with random data, perfect for testing and prototyping web interfaces. It supports various data types including text, images, and dates.  

## Getting Started  

To get started, you can install `RandomUtil` via NPM:  

```shell 
npm i @danielhaim/randomutil
```

## Usage

### RandomContentManager
Initialize a RandomContentManager instance by providing the category ID to select the corresponding data arrays:
  
```js
const randomContent = new RandomContentManager(1);
```

### RandomController

Initialize a RandomController instance:

```js
const randomController = new RandomUtilController({});
```

### RandomTag, RandomTitle, RandomExcerpt
Generate random tags, titles, and excerpts using the RandomController:

```js
randomController.randomTag(randomContent.randomTags);
randomController.randomTitle(randomContent.randomTitles);
randomController.randomExcerpt(randomContent.randomExcerpts);
```

### randomReadTime
Generate a random read time:

```js
randomController.randomReadTime();
```

### randomDate

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

### randomImages

The `randomImage` method allows you to fetch and display a set of random images from Unsplash, based on specified parameters.

### Prerequisites
Register for an Unsplash API key at [Unsplash Applications](https://unsplash.com/oauth/applications)

### Usage

First, import the `RandomImageUtil` class from your package. Then, initialize it with your Unsplash API key and desired parameters.


```
const randomImage = new RandomImageUtil(count, query, orientation, accessKey);
```

- `count` (Optional): Number of images to fetch. Default is 12.
- `query` (Optional): The category of images. Default is "nature".
- `orientation` (Optional): The orientation of the images. Default is "landscape".
- `accessKey` (Optional): Your Unsplash API key. If not provided, it will default to process.env.UNSPLASH_API_KEY.

```js
const UNSPLASH_ACCESS_KEY = 'your-api-key';
const randomImage = new RandomImageUtil(10, "nature", "landscape", UNSPLASH_ACCESS_KEY);
```

This initializes the `RandomImageUtil` with the capability to fetch 10 nature-themed landscape images using the provided Unsplash API key.

**Target HTML Attribute:** The method targets elements with the `[data-random='img']` attribute. Depending on the element's tag (`img` for image tags or a `div` for background images), it sets the source or background style respectively.

### Error Handling

The class includes robust error handling to manage potential issues such as missing access keys, network errors, or unsuccessful API calls. Errors are logged to the console for debugging purposes. It's recommended to extend this for user-friendly error messages or alternative content display in a production environment.

### randomAvatar

The `randomAvatar` method allows you to create and display random avatars with various customization options. This method is part of the RandomUtil utility for adding dynamic content to your web application.

### Usage Example

```javascript
const randomUtil = new RandomUtil();
randomUtil.randomAvatar({
  avatarOptions: {
    variant: "smile",
    colors: ["#FF5733", "#33FF57", "#5733FF"],
    square: true,
    size: 128,
  },
});
```

```js
const randomUtil = new RandomUtil();
randomUtil.randomAvatar({ avatarOptions: { variant: "smile" } });
```

```js
const randomUtil = new RandomUtil();
randomUtil.randomAvatar({ avatarOptions: { variant: "pixel" } });
```

```js
const randomUtil = new RandomUtil();
randomUtil.randomAvatar({ avatarOptions: { variant: "abstract" } });
```

randomTopic Method
------------------

- **Method Signature:** `randomTopic(topics)`
- **Description:** This method selects random topics from the provided array and populates elements with the `[data-random="topic"]` attribute.
- **Usage:** `randomUtil.randomTopic(randomData.randomTopics);`
- **Parameters:** `topics`: *Array&lt;String&gt;* - An array of string topics from which a random topic will be chosen.
- **Target HTML Attribute:** This method targets elements with the `[data-random="topic"]` attribute and updates their content.

randomTitle Method
------------------

- **Method Signature:** `randomTitle(titles)`
- **Description:** This method selects a random title from the provided array and populates elements with the `[data-random="title"]` attribute.
- **Usage:** `randomUtil.randomTitle(randomData.randomTitles);`
- **Parameters:** `titles`: *Array&lt;String&gt;* - An array of string titles from which a random title will be chosen.
- **Target HTML Attribute:** This method targets elements with the `[data-random="title"]` attribute and updates their content.

randomReadTime Method
---------------------

- **Method Signature:** `randomReadTime()`
- **Description:** This method generates a random read time between 2 and 12 minutes and populates elements with the `[data-random="time"]` attribute.
- **Usage:** `randomUtil.randomReadTime();`
- **Target HTML Attribute:** This method targets elements with the `[data-random="time"]` attribute and updates their content.

randomExcerpt Method
--------------------

- **Method Signature:** `randomExcerpt(excerpts)`
- **Description:** This method selects a random excerpt from the provided array and populates elements with the `[data-random="excerpt"]` attribute.
- **Usage:** `randomUtil.randomExcerpt(randomData.randomExcerpts);`
- **Parameters:** `excerpts`: *Array&lt;String&gt;* - An array of string excerpts from which a random excerpt will be chosen.
- **Target HTML Attribute:** This method targets elements with the `[data-random="excerpt"]` attribute and updates their content.

## Folder Structure
```
├── .env
├── .gitattributes
├── .gitignore
├── .nvmrc
├── LICENSE
├── README.md
├── __test__
│   └── RandomUtil.amd.test.js
├── babel.config.js
├── dist
│   ├── RandomUtil.amd.js
│   ├── RandomUtil.js
│   └── RandomUtil.js.map
├── demo
│   ├── demo.css
│   ├── demo.js
│   ├── demo.png
│   └── index.html
├── index.js
├── jest.config.js
├── package.json
├── sets
│   ├── palette.0.json
│   ├── palette.1.json
│   ├── palette.2.json
│   ├── palette.3.json
│   └── palette.4.json
├── src
│   ├── index.js
│   ├── util.avatar.js
│   ├── util.content.js
│   ├── util.date.js
│   └── util.image.js
└── webpack.config.js
```