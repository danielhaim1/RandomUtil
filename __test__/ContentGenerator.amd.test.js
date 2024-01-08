/**
 * @jest-environment jsdom
 */

import ContentGenerator from "../dist/ContentGenerator.amd.js";
import { RandomContent } from "../src/util.random.content.js"; // Assuming this is the correct path

// Mocking document structure
document.body.innerHTML = `
  <div data-random="topic"></div>
  <div data-random="title"></div>
  <div data-random="time"></div>
  <div data-random="excerpt"></div>
  <div data-random="date"></div>
  <img data-random="img" />
`;

const randomData = new RandomContent(1);
const contentGenerator = new ContentGenerator({
  topics: "[data-random='topic']",
  titles: "[data-random='title']",
  time: "[data-random='time']",
  excerpts: "[data-random='excerpt']",
  date: "[data-random='date']"
});

test('ContentGenerator updates DOM elements with random content', () => {

// const randomData = new RandomContent(1);
// const contentGenerator = new ContentGenerator({
//   topics: "[data-random='topic']",
//   titles: "[data-random='title']",
//   time: "[data-random='time']",
//   excerpts: "[data-random='excerpt']",
//   date: "[data-random='date']"
// imageSelector: "[data-random='img']"
// });

// contentGenerator.randomTopic(randomData.randomTopics);
// contentGenerator.randomTitle(randomData.randomTitles);
// contentGenerator.randomExcerpt(randomData.randomExcerpts);
// contentGenerator.randomReadTime();
// contentGenerator.randomDate("g:i:s a");
// contentGenerator.randomImages({ count: 10, query: "cityscape", orientation: "portrait" });
});
