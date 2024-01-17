import { sendResendEmail } from "./jobs/send-resend-email";
import getMailingList from "./services/get-mailing-list";
import getTodayQuestions from "./services/get-today-questions";
import getTodayRevisionQuestions from "./services/get-today-revision-questions";
import cron from "node-cron";
import http from "http";

async function sendMail() {
  const mailingList = getMailingList();
  const questions = getTodayQuestions();
  const revisionQuestions = getTodayRevisionQuestions();
  await sendResendEmail(mailingList, questions, revisionQuestions);
}

if (process.env.EXEC === "CLI") {
  sendMail();
}

if (process.env.EXEC !== "CLI") {
  cron.schedule("0 5 * * *", async () => {
    await sendMail();
  });

  const server = http.createServer((req, res) =>
    req.url === "/health"
      ? res.end(JSON.stringify({ status: "ok" }))
      : res.end("Not Found")
  );

  server.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
}
