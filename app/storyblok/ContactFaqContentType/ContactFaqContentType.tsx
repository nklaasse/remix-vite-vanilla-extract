import React from "react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { ContactFaqStoryblok } from "../component-types-sb";
import { Accordion } from "~/components/Accordion";
import { contactFaqSection } from "./ContactFaqContentType.css";
import type { RichTextType } from "~/utils/richTextForTypography";
import {
  modifyForTypography,
  generateForTypography,
} from "~/utils/richTextForTypography";

export const loader = async (
  storyContent: ContactFaqStoryblok,
  _args: LoaderFunctionArgs
) => {
  const faqList = await Promise.all(
    storyContent.faqList.map(
      async ({
        label,
        content,
        _uid,
      }): Promise<{
        label: string;
        content: Awaited<ReturnType<typeof modifyForTypography>>;
        _uid: string;
      }> => {
        const richTextContent = content as RichTextType;

        return {
          label,
          _uid,
          content: await modifyForTypography(richTextContent),
        };
      }
    )
  );

  return {
    component: storyContent.component,
    props: {
      title: storyContent.title,
      faqList,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, faqList } = data;

  const generatedFaqList = React.useMemo(() => {
    return faqList.map(({ label, content, _uid }) => {
      return {
        textValue: label,
        key: _uid,
        children: generateForTypography(content),
      };
    });
  }, [faqList]);

  return (
    <div className={contactFaqSection.container}>
      <h2 className={contactFaqSection.title}>{title}</h2>
      <div className={contactFaqSection.content}>
        <Accordion items={generatedFaqList}>
          {(item) => (
            <Accordion.Item key={item.key} textValue={item.textValue}>
              <Accordion.Summary>{item.textValue}</Accordion.Summary>
              <Accordion.Content>{item.children}</Accordion.Content>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
}
