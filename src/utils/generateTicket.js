import allQuestions from "../data/questions";
import { shuffleArray } from "./shuffle";

export function generateTicket(count = 10) {
  return shuffleArray(allQuestions).slice(0, count);
}
