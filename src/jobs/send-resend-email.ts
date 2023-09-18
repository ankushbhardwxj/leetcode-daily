import { Resend } from "resend";
import DailyLeetcodeEmail from "../../template/emails/daily-leetcode-email";
import questions from "../data/data";
import {
  LeetcodeQuestion,
  UnknownLeetcodeQuestion,
} from "../services/get-today-revision-questions";

const resend = new Resend("re_gjByWkX2_13AL1WpE1LfDTQ5X2uQhWwKA");

export async function sendResendEmail(
  mailingList: Array<{ email: string; name: string }>,
  questions: Array<LeetcodeQuestion>,
  revisionQuestions: Array<LeetcodeQuestion | UnknownLeetcodeQuestion>
) {
  for (let i = 0; i < mailingList.length; i++) {
    let user = mailingList[i];
    console.log("Sending email to ", user.email);
    const data = await resend.emails.send({
      from: "Leetcode Daily Bot <onboarding@resend.dev>",
      to: [user.email],
      subject: `Today's Daily Leetcode Questions - ${new Date().toDateString()}`,
      react: DailyLeetcodeEmail({
        questions: questions,
        revisionQuestions: revisionQuestions,
        user: { name: user.name, email: user.email },
      }),
    });
    console.log(data);
  }
}
