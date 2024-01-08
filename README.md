# ContentGenerator API
=======================

Overview
--------

`ContentGenerator` is an NPM package for easily populating DOM elements with random data, perfect for testing and prototyping web interfaces. Supports various data types including text, images, and dates.

-----

- **Random Date:** `span[data-random="date"]`
- **Random Read Time**: `span[data-random="time"]`
- **Random Topic:** `span[data-random="topic"]`
- **Random Title:** `span[data-random="title"]`
- **Random Excerpt:** `span[data-random="excerpt"]`
- **Random Image:**  `span[data-random="img"]`
 
 ---

Initialization
--------------

```js
const randomData = new RandomDataArrays(1);
const randomDataGenerator = new RandomDataGenerator();
randomDataGenerator.randomTopic(randomData.randomTopics);
randomDataGenerator.randomTitle(randomData.randomTitles);
randomDataGenerator.randomExcerpt(randomData.randomExcerpts);
randomDataGenerator.randomReadTime();
randomDataGenerator.randomDate("g:i:s a");
randomDataGenerator.randomImages(10, "nature", "landscape");
```

Classes &amp; Properties
------------------------

- `topicElements`: NodeList of elements to be updated with random topics.
- `titleElements`: NodeList of elements to be updated with random titles.
- `readTimeEls`: NodeList of elements to be updated with random read times.
- `excerptElements`: NodeList of elements to be updated with random excerpts.
- `dateManager`: Instance of `RandomDateManager` for managing random date generation.
 
### RandomDataArrays

**Description:** This class stores and manages arrays of data categorized by topics, titles, excerpts, and authors.
**Constructor Signature:** `new RandomDataArrays(category)`
**Usage:** `const randomData = new RandomDataArrays(1);`
**Parameters:**
- `category`: The category ID to select the corresponding data arrays.
 
### RandomDataGenerator

**Description:** This class is responsible for selecting random data from the provided arrays and updating the respective DOM elements.
**Constructor Signature:** `new RandomDataGenerator()`
**Usage:** `const randomDataGenerator = new RandomDataGenerator();`
**Properties:** Inherits properties like `topicElements`, `titleElements`, etc., from `RandomDataArrays`.

randomDate Method
-----------------

**Method Signature:** `randomDate()`
**Description:** This method triggers the `dateManager` to generate and update elements with a random date.
**Usage:** `randomDataGenerator.randomDate();`
**Target HTML Attribute:** This method targets elements with the `[data-random="date"]` attribute managed by the `dateManager` and updates their content with a formatted date.

 
```js
randomDataGenerator.randomDate("F j, Y g:i a"); // November 6, 2010 12:50 am
randomDataGenerator.randomDate("F j, Y"); // November 6, 2010
randomDataGenerator.randomDate("F j, Y"); // November, 2010
randomDataGenerator.randomDate("F, Y"); // November 6, 2010
randomDataGenerator.randomDate("g:i a"); // 12:50 am
randomDataGenerator.randomDate("g:i:s a"); // 12:50:48 am
randomDataGenerator.randomDate("l, F jS, Y"); // Saturday, November 6th, 2010
randomDataGenerator.randomDate("M j, Y @ G:i"); // Nov 6, 2010 @ 0:50
randomDataGenerator.randomDate("Y/m/d \a\t g:i A"); // 2010/11/06 at 12:50 AM
randomDataGenerator.randomDate("Y/m/d \a\t g:ia"); // 2010/11/06 at 12:50am
randomDataGenerator.randomDate("Y/m/d g:i:s A"); // 2010/11/06 12:50:48 AM
randomDataGenerator.randomDate("Y/m/d"); // 2010/11/06
```

 **Day of Month**   
--------------------
 **d**              | Numeric, with leading zeros                 | 01–31                                  
 **j**              | Numeric, without leading zeros              | 1–31                                   
 **S**              | The English suffix for the day of the month | st, nd or th in the 1st, 2nd or 15th\. 
 **Weekday**        
 **l**              | Full name &nbsp;\(lowercase ‘L’\)           | Sunday – Saturday                      
 **D**              | Three letter name                           | Mon – Sun                              
 **Month**          
 **m**              | Numeric, with leading zeros                 | 01–12                                  
 **n**              | Numeric, without leading zeros              | 1–12                                   
 **F**              | Textual full                                | January – December                     
 **M**              | Textual three letters                       | Jan – Dec                              
 **Year**           
 **Y**              | Numeric, 4 digits                           | Eg\., 1999, 2003                       
 **y**              | Numeric, 2 digits                           | Eg\., 99, 03                           
 **Time**           
 **a**              | Lowercase                                   | am, pm                                 
 **A**              | Uppercase                                   | AM, PM                                 
 **g**              | Hour, 12\-hour, without leading zeros       | 1–12                                   
 **h**              | Hour, 12\-hour, with leading zeros          | 01–12                                  
 **G**              | Hour, 24\-hour, without leading zeros       | 0\-23                                  
 **H**              | Hour, 24\-hour, with leading zeros          | 00\-23                                 
 **i**              | Minutes, with leading zeros                 | 00\-59                                 
 **s**              | Seconds, with leading zeros                 | 00\-59                                 
 **T**              | Timezone abbreviation                       | Eg\., EST, MDT …                       
 **Full Date/Time** 
 **c**              | ISO 8601                                    | 2004\-02\-12T15:19:21\+00:00           
 **r**              | RFC 2822                                    | Thu, 21 Dec 2000 16:01:07 \+0200       
 **U**              | Unix timestamp \(seconds since Unix Epoch\) | 1455880176                             

randomTopic Method
------------------

**Method Signature:** `randomTopic(topics)`

**Description:** This method selects random topics from the provided array and populates elements with the `[data-random="topic"]` attribute.

**Usage:** `randomDataGenerator.randomTopic(randomData.randomTopics);`

**Parameters:** `topics`: *Array&lt;String&gt;* - An array of string topics from which a random topic will be chosen.

**Target HTML Attribute:** This method targets elements with the `[data-random="topic"]` attribute and updates their content.

randomImage Method
------------------

 ```
const randomImage = new RandomImage(10, "landscape", "nature");
```
```
randomDataGenerator.randomImages(10, "nature", "landscape");
```

**Method Signature:** `new randomImages(count, orientation, query)`

**Description:** The RandomImage class fetches a specified number of images based on the given query and orientation from the Unsplash API. It then populates elements with the `[data-random='img']` attribute with these images.

**Usage:** Create an instance of RandomImage with the desired parameters. Call the `init()` method to start fetching and displaying images.

**Parameters:**

- `count` (optional, default = 12): The number of images to fetch.
- `query` (optional, default = "nature"): The search term used to query images from Unsplash.
- `orientation` (optional, default = "landscape"): The orientation of the images ("landscape", "portrait", or "squarish").
 
**Target HTML Attribute:** The method targets elements with the `[data-random='img']` attribute. Depending on the element's tag (`img` for image tags or a `div` for background images), it sets the source or background style respectively.

### Error Handling

The class includes robust error handling to manage potential issues such as missing access keys, network errors, or unsuccessful API calls. Errors are logged to the console for debugging purposes. It's recommended to extend this for user-friendly error messages or alternative content display in a production environment.

randomTitle Method
------------------

**Method Signature:** `randomTitle(titles)`

**Description:** This method selects a random title from the provided array and populates elements with the `[data-random="title"]` attribute.

**Usage:** `randomDataGenerator.randomTitle(randomData.randomTitles);`

**Parameters:** `titles`: *Array&lt;String&gt;* - An array of string titles from which a random title will be chosen.

**Target HTML Attribute:** This method targets elements with the `[data-random="title"]` attribute and updates their content.

randomReadTime Method
---------------------

**Method Signature:** `randomReadTime()`

**Description:** This method generates a random read time between 2 and 12 minutes and populates elements with the `[data-random="time"]` attribute.

**Usage:** `randomDataGenerator.randomReadTime();`

**Target HTML Attribute:** This method targets elements with the `[data-random="time"]` attribute and updates their content.

randomExcerpt Method
--------------------

**Method Signature:** `randomExcerpt(excerpts)`

**Description:** This method selects a random excerpt from the provided array and populates elements with the `[data-random="excerpt"]` attribute.

**Usage:** `randomDataGenerator.randomExcerpt(randomData.randomExcerpts);`

**Parameters:** `excerpts`: *Array&lt;String&gt;* - An array of string excerpts from which a random excerpt will be chosen.

**Target HTML Attribute:** This method targets elements with the `[data-random="excerpt"]` attribute and updates their content.



## Folder Structure
```
.
├── .env
├── .gitattributes
├── .gitignore
├── .nvmrc
├── LICENSE
├── README.md
├── __test__
│   └── ContentGenerator.amd.test.js
├── babel.config.js
├── demo
│   └── index.html
├── dist
│   ├── ContentGenerator.amd.js
│   ├── ContentGenerator.amd.js.map
│   ├── ContentGenerator.js
│   └── ContentGenerator.js.map
├── index.js
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── index.js
│   ├── util.random.content.js
│   ├── util.random.date.js
│   └── util.random.image.js
└── webpack.config.js
```



<!-- 
RandomDateUtil
Constructor Dependency:

The constructor of RandomDateUtil expects a parent object from which it gets dateElements. This design requires that parent always have a dateElements property. Ensure that the ContentGenerator always provides this.
Method randomDate:

It correctly checks if dateElements exists and has a length before proceeding, which is good. If dateElements is not defined or empty, it won't throw an error.
RandomContent
Constructor and Initialization:
This class initializes data based on a category. Ensure that the category passed is valid and that this.dataByCategory[this.category] exists and is structured correctly.
RandomImageUtil
API Key Usage:

The class uses process.env.RANDOM_IMAGE_API_KEY for the Unsplash API key. Verify that the key is correctly being injected during the build process for your AMD module.
DOM Interaction:

The method init looks for elements with data-random='img'. Ensure these elements exist in the DOM when init is called.
Asynchronous Operations:

The methods init and fetchAndCacheImages involve asynchronous operations (fetching data from an API). Make sure that these operations are handled properly where init is called.
 -->
