/**
 * @jest-environment jsdom
 */

import RandomUtil from "../dist/randomutil.amd.js";
import { RandomContent } from "../src/util.content.js";

// Setting up the HTML structure for testing
document.body.innerHTML = `
  <div data-random="tag"></div>
  <div data-random="title"></div>
  <div data-random="time"></div>
  <div data-random="excerpt"></div>
  <div data-random="date"></div>
  <img data-random="img" />
  <div data-random="avatar"></div>
`;

test('RandomUtil updates DOM elements with random content', () => {
  const randomContent = new RandomContentManager(1);
  const randomController = new RandomUtilController({});

  randomController.randomTag(randomContent.randomTags);
  randomController.randomTitle(randomContent.randomTitles);
  randomController.randomExcerpt(randomContent.randomExcerpts);

  randomController.randomReadTime();
  randomController.randomDate("Y/m/d");

  // const randomImageCount = document.querySelectorAll("[data-random='img']").length;
  // randomController.randomImages({ count: randomImageCount, query: "nature", orientation: "portrait", accessKey: UNSPLASH_ACCESS_KEY });

  randomController.randomAvatar({ avatarOptions: { variant: "default" } });
});