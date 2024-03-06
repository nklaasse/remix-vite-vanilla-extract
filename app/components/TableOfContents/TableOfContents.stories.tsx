import type { modifyForTypography } from "~/utils/richTextForTypography";
import {
  generateForTypography,
  getHeadingsFromContent,
  type HeadingNode,
} from "~/utils/richTextForTypography";
import { useContentObserver } from "~/hooks/useContentObserver";

import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import { TableOfContents } from "./TableOfContents";

export default {
  title: "Components/TableOfContents",
  component: TableOfContents,
} as Meta<typeof TableOfContents>;

const CONTENT = {
  "type": "doc",
  "props": {},
  "content": [
    {
      "type": "heading",
      "props": {
        "level": 1,
        "id": "cats-and-their-extraordinary-computer-skills",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Cats and Their Extraordinary Computer Skills",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "In recent years, there have been numerous reports and fascinating anecdotes about cats demonstrating unexpected computer prowess. These feline whiz-kids have astounded and amused people around the world with their seemingly innate ability to interact with computers. Let's delve into the intriguing world of tech-savvy cats and explore their remarkable computer skills.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 2,
        "id": "the-rise-of-tech-savvy-felines",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "The Rise of Tech-Savvy Felines",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "The emergence of cats using computers can be attributed to several factors. Firstly, the ubiquity of computers and digital devices in households has exposed cats to these technologies from an early age. Cats are naturally curious creatures, and their inquisitive nature gravitates them towards exploring the devices that occupy their owners' attention.",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "Secondly, the advent of touch screen technology has played a significant role in cats' ability to interact with computers. Touch screens provide a more intuitive interface that aligns with a cat's dexterity and paw-eye coordination. Cats quickly adapted to this new form of human-computer interaction, effortlessly swiping and tapping on screens to navigate various applications.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 2,
        "id": "remarkable-achievements",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Remarkable Achievements",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "Cats' computer skills have transcended mere screen-tapping and extended into more advanced realms. Here are some remarkable achievements of tech-savvy cats:",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 3,
        "id": "paw-fect-typists",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Paw-fect Typists",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "Perhaps the most awe-inspiring feat is cats' ability to type on keyboards. Whether it's a casual stroll or a playful paw-dance, these feline prodigies have been caught displaying remarkable typing skills. Some cats have been observed typing coherent sentences, while others have even composed melodies by diligently pawing at the keys. Their innate sense of rhythm and timing has astounded many onlookers.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 3,
        "id": "cat-hackers",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Cat Hackers",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "Cats have also demonstrated an affinity for hacking into computer systems. Their nimble paws seem to possess an inherent knack for manipulating keyboards and deciphering complex passwords. While their intentions may be innocent, these hacking skills have raised eyebrows among cybersecurity experts who can't help but admire the cats' innate knack for infiltrating digital fortresses.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 3,
        "id": "gaming-champions",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Gaming Champions",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "Cats have become veritable gaming champions, particularly in the realm of mobile gaming and interactive apps. They exhibit lightning-fast reflexes and uncanny precision, enabling them to excel in games that require swiping, tapping, and chasing virtual objects. Some cats have even achieved gaming fame, garnering millions of followers on social media platforms, where their exploits are shared with an adoring audience.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 2,
        "id": "the-x-factor-catnip-or-cattop",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "The X-Factor: Catnip or Cattop?",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            'What is the secret behind cats\' remarkable computer abilities? Experts have hypothesized that there might be a connection between these skills and a substance known as "Cattop." Similar to the effects of catnip, Cattop is believed to enhance cognitive functions in cats. Some researchers suspect that exposure to Cattop in their environment could explain the exceptional computer prowess exhibited by these feline prodigies. However, extensive research is still needed to substantiate these claims.',
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 2,
        "id": "unleashing-the-full-potential",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Unleashing the Full Potential",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "As we witness cats' impressive aptitude for computers, one can't help but wonder about the untapped potential lying dormant within these enigmatic creatures. Further exploration of their abilities could lead to the development of new ways for animals to interact with technology and potentially uncover hidden talents that may benefit both humans and animals alike.",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "However, it is vital to strike a balance and ensure that cats' engagement with computers and digital devices does not overshadow their instinctual needs for exercise, play, and human interaction. Responsible pet ownership entails providing a stimulating environment that encompasses both the digital world and the natural world to maintain cats' overall well-being.",
        },
      ],
    },
    {
      "type": "heading",
      "props": {
        "level": 2,
        "id": "conclusion",
      },
      "content": [
        {
          "type": "text",
          "props": {},
          "text": "Conclusion",
        },
      ],
    },
    {
      "type": "paragraph",
      "props": {},
      "content": [
        {
          "type": "text",
          "props": {},
          "text":
            "The emergence of cats with extraordinary computer skills has fascinated and captivated people worldwide. Whether they are typing prose, hacking into systems, or dominating the gaming scene, these tech-savvy felines showcase the unexpected talents that lie within the animal kingdom. As our understanding of cats' capabilities deepens, we may unlock new possibilities for human-animal interaction and pave the way for a future where cats and computers coexist harmoniously.",
        },
      ],
    },
  ],
};

export const Default: StoryFn<typeof TableOfContents> = () => {
  const content = CONTENT as Awaited<ReturnType<typeof modifyForTypography>>;

  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const headings = getHeadingsFromContent(content);

  const result = React.useMemo(() => {
    return generateForTypography(content);
  }, [content]);

  useContentObserver(contentRef);

  const [hashId, setHashId] = React.useState<string>(() => {
    if (typeof window === "undefined") {
      return "";
    }

    if (window.location.hash.substring(0, 1) === "#") {
      return window.location.hash.substring(1);
    }

    return "";
  });

  React.useEffect(() => {
    const onHashChange = () => {
      // gets the id from the hash
      const idFromHash = window.location.hash.substring(1);
      // checks if the id from the hash is in the headings
      const existingHeading = headings.find(
        (heading) => heading.id === idFromHash
      );

      // if the id from the hash is in the headings, set the hashId state
      if (window.location.hash.substring(0, 1) === "#" && existingHeading) {
        setHashId(idFromHash);
      }
    };

    window.addEventListener("hashchange", onHashChange, false);

    return () => {
      window.removeEventListener("hashchange", onHashChange, false);
    };
  }, [setHashId, headings]);

  const selectedKeys = React.useMemo(() => {
    for (let heading of headings) {
      if (heading.id === hashId) {
        return [heading.id];
      }

      if (heading.children) {
        for (let subHeading of heading.children) {
          if (subHeading.id === hashId) {
            return [heading.id, subHeading.id];
          }
        }
      }
    }

    return [];
  }, [headings, hashId]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          width: "320px",
          height: "max-content",
          position: "sticky",
          top: 0,
          padding: "16px",
        }}
      >
        <TableOfContents>
          <TableOfContents.Title>Table of Contents</TableOfContents.Title>
          <TableOfContents.Menu
            items={headings}
            selectedKeys={selectedKeys}
            defaultExpandedKeys={selectedKeys}
            onAction={(key) => {
              window.location.hash = `#${key}`;
            }}
          >
            {(heading: HeadingNode) => {
              if (heading.children && heading.children.length > 0) {
                return (
                  <TableOfContents.Item
                    key={heading.id}
                    title={heading.text}
                    hasChildItems={true}
                    childItems={heading.children}
                  >
                    {heading.children.map((subHeading) => (
                      <TableOfContents.Item key={subHeading.id}>
                        {subHeading.text}
                      </TableOfContents.Item>
                    ))}
                  </TableOfContents.Item>
                );
              }

              return (
                <TableOfContents.Item key={heading.id}>
                  {heading.text}
                </TableOfContents.Item>
              );
            }}
          </TableOfContents.Menu>
        </TableOfContents>
      </div>
      <div style={{ width: "70%" }} ref={contentRef}>
        {result}
      </div>
    </div>
  );
};
