import type { Meta, StoryFn } from "@storybook/react";
import { Accordion } from "./Accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta<typeof Accordion>;

export const Default: StoryFn<typeof Accordion> = () => {
  const items = [
    {
      key: "1",
      textValue: "Can I place a part on the next page (in PDF)?",
      children: (
        <>
          <p>
            This is certainly possible. This can be done in our CV maker in the
            following 2 ways:
          </p>
          <ol>
            <li>
              You can choose to place the complete part (for example Education
              and Qualifications) on the following page by pressing the 3 dots
              next to the part and choosing &quot;on the next page (pdf)&quot;.
              As a result, the entire part is placed on the next page.
            </li>
            <li>
              In the description of the previous section, you can press the
              Enter key multiple times in the text editor so that you can adjust
              the transition a bit more precisely.
            </li>
          </ol>
        </>
      ),
    },
    {
      key: "2",
      textValue:
        "Can I also download my CV or cover letter in different language?",
      children: (
        <p>
          You can change the language of your CV or cover letter by choosing
          your preferred language at the top of the page next to the language
          selection (with a flag). All fixed text will automatically be
          translated to your chosen language. You still have to translate all
          the text fields that you entered yourself.
        </p>
      ),
    },
    {
      key: "3",
      textValue: "Can you help me write my CV or cover letter?",
      children: (
        <p>
          Absolutely! Aside from our advanced tools where you can easily create
          your own CV and cover letters, we also offer CV writing services. Are
          you short on time, or are you unable to create a professional CV or
          cover letter yourself? Then check out our various CV Services. More
          information about our
          <a
            href="https://www.cvmaker.uk/cv-writing-service"
            target="_blank"
            rel="noreferrer"
          >
            CV Service can be found here
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <Accordion items={items}>
      {(item) => (
        <Accordion.Item key={item.key}>
          <Accordion.Summary>{item.textValue}</Accordion.Summary>
          <Accordion.Content>{item.children}</Accordion.Content>
        </Accordion.Item>
      )}
    </Accordion>
  );
};
