/**
 * @jest-environment jsdom
 */

import RandomUtil from "../dist/RandomUtil.amd.js";
import { RandomContent } from "../src/util.content.js";

// Setting up the HTML structure for testing
document.body.innerHTML = `
  <div data-random="topic"></div>
  <div data-random="title"></div>
  <div data-random="time"></div>
  <div data-random="excerpt"></div>
  <div data-random="date"></div>
  <img data-random="img" />
  <div data-random="avatar"></div>  // Added missing avatar container
`;

const randomContent = new RandomContent(1);
const randomUtil = new RandomUtil({
  topics: "[data-random='topic']",
  titles: "[data-random='title']",
  time: "[data-random='time']",
  excerpts: "[data-random='excerpt']",
  date: "[data-random='date']",
  imageSelector: "[data-random='img']",
  avatarSelector: "[data-random='avatar']" // Corrected syntax errors
});

test('RandomUtil updates DOM elements with random content', () => {
  randomUtil.randomTopic(randomContent.randomTopics);
  randomUtil.randomTitle(randomContent.randomTitles);
  randomUtil.randomExcerpt(randomContent.randomExcerpts);
  randomUtil.randomReadTime();
  randomUtil.randomDate("g:i:s a");

  // Updated method calls to match expected parameters
  randomUtil.randomAvatars({ containerSelector: "[data-random='avatar']", count: 5 }); // Example usage
  randomUtil.randomImages({ count: 1, query: "nature", orientation: "landscape" });
  randomUtil.randomImages({ count: 10, query: "cityscape", orientation: "portrait" });
});