import questions from "../data/data";
import pickRandomObjects from "../utils/pick-random";

export default function getTodayQuestions() {
  const filteredQuestions = questions.filter(
    (question) => question.Rating >= 1500 && question.Rating <= 2200
  );
  const randomQuestions = pickRandomObjects(filteredQuestions, 5);
  return randomQuestions;
}

getTodayQuestions();
