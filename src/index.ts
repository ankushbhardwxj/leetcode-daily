import { sendResendEmail } from "./jobs/send-resend-email";
import getMailingList from "./services/get-mailing-list";
import getTodayQuestions from "./services/get-today-questions";
import getTodayRevisionQuestions from "./services/get-today-revision-questions";
import cron from "node-cron";

cron.schedule("0 5 * * *", async () => {
  const mailingList = getMailingList();
  const questions = getTodayQuestions();
  const revisionQuestions = getTodayRevisionQuestions();
  await sendResendEmail(mailingList, questions, revisionQuestions);
});
