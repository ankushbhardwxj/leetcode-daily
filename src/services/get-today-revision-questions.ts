import questions from "../data/data";
import revisionQuestions from "../data/revision";
import pickRandomObjects from "../utils/pick-random";

export interface LeetcodeQuestion {
  Rating: number;
  ID: number;
  Title: string;
  TitleZH: string;
  TitleSlug: string;
  ContestSlug: string;
  ProblemIndex: string;
  ContestID_en: string;
  ContestID_zh: string;
}

export interface UnknownLeetcodeQuestion {
  Title: string;
  TitleSlug: string;
}

// pick 5 random links for revision
// check the slug to all questions data and return that object
// if question data doesn't exist, then return
// {Title, Slug, Rating}
export default function getTodayRevisionQuestions() {
  const randomQuestions = pickRandomObjects(revisionQuestions, 5);
  let questionObjects: Array<LeetcodeQuestion | UnknownLeetcodeQuestion> =
    randomQuestions.map((question) => {
      let questionObject: LeetcodeQuestion;
      const suffix = question.split("https://leetcode.com/")[1];
      const slug = suffix.split("/")[1];
      questions.forEach((q) => {
        if (q.TitleSlug === slug) questionObject = q;
      });
      if (questionObject?.TitleSlug !== undefined)
        return questionObject as LeetcodeQuestion;
      else {
        const title = slug.split("-").reduce((acc, curr) => {
          return (acc += curr[0].toUpperCase() + curr.slice(1) + " ");
        }, "");
        return { Title: title, TitleSlug: slug } as UnknownLeetcodeQuestion;
      }
    });
  questionObjects = questionObjects.filter(
    (question) => question !== undefined
  );
  console.log(questionObjects);
  return questionObjects;
}

getTodayRevisionQuestions();
