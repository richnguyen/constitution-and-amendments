// Constitution Quest — content aggregator.
// The single import point for all static content. Views import DATA and never
// hardcode constitutional text.

import { preamble, articles } from "./data/articles.js";
import { amendments } from "./data/amendments.js";
import { chapters, badges, founders, quizzes, glossary } from "./data/course.js";

const DATA = {
  preamble,
  articles,
  amendments,
  chapters,
  badges,
  founders,
  quizzes,
  glossary,
};

export { DATA };
export default DATA;
