import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import {
  LeetcodeQuestion,
  UnknownLeetcodeQuestion,
} from "../../src/services/get-today-revision-questions";

interface DailyLeetcodeEmailProps {
  questions: Array<LeetcodeQuestion>;
  revisionQuestions: Array<LeetcodeQuestion | UnknownLeetcodeQuestion>;
  user: { name: string; email: string };
}

export const DailyLeetcodeEmail: React.FC<
  Readonly<DailyLeetcodeEmailProps>
> = ({ revisionQuestions, questions, user }) => {
  return (
    <Html>
      <Head />
      <Preview>5 Questions - 2200+ Rating - FAANG !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Leetcode Practice - {new Date().toDateString()}
          </Heading>
          <Text style={text}>
            Hey {user.name}, Here are today's leetcode questions for your
            practice. Make sure to solve them as soon as possible.
          </Text>
          {questions.map((question: LeetcodeQuestion, idx: number) => (
            <>
              <Link
                style={link}
                href={`https://leetcode.com/problems/${question.TitleSlug}`}
              >
                {idx + 1}. {question.Title} ({Math.ceil(question.Rating)})
              </Link>
              <Text style={subtext}>
                Appeared {question.ProblemIndex} on {question.ContestID_en}
              </Text>
            </>
          ))}
          <Text style={text}>
            Here are today's classical questions for your revision.
          </Text>
          {revisionQuestions.map(
            (
              question: LeetcodeQuestion | UnknownLeetcodeQuestion,
              idx: number
            ) => {
              if ((question as LeetcodeQuestion).Rating !== undefined)
                return (
                  <>
                    <Link
                      style={link}
                      href={`https://leetcode.com/problems/${question.TitleSlug}`}
                    >
                      {idx + 1}. {question.Title} (
                      {Math.ceil((question as LeetcodeQuestion).Rating)})
                    </Link>
                    <Text style={subtext}>
                      Appeared {(question as LeetcodeQuestion).ProblemIndex} on{" "}
                      {(question as LeetcodeQuestion).ContestID_en}
                    </Text>
                  </>
                );
              else
                return (
                  <>
                    <Link
                      style={link}
                      href={`https://leetcode.com/problems/${question.TitleSlug}`}
                    >
                      {idx + 1}. {question.Title} (Not Rated)
                    </Link>
                    <Text style={subtext}>Classical Question</Text>
                  </>
                );
            }
          )}
        </Container>
      </Body>
    </Html>
  );
};

export default DailyLeetcodeEmail;

const main = {
  backgroundColor: "#000000",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "auto",
  padding: "96px 20px 64px",
};

const link = {
  color: "#ffffff",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 40px",
  textDecoration: "underline",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const text = {
  color: "#aaaaaa",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 40px",
};

const subtext = {
  color: "#aaaaaa",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 40px",
  fontStyle: "italic",
};
