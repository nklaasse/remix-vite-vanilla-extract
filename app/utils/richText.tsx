// Checks if the type contains all the keys of the struct and no extra keys
type ValidateStructure<T, Struct> =
  // Check if the type has all the keys of the struct
  T extends Struct
    ? // Check if the type doesn't contain keys which are not in the struct
      Exclude<keyof T, keyof Struct> extends never
      ? // Return the type if it passes both checks
        T
      : never
    : never;

interface RichTextDocNode {
  type: "doc";
  attrs: {};
}

interface RichTextTextNode {
  type: "text";
  attrs: {};
}

interface RichTextHeadingNode {
  type: "heading";
  attrs: { level: number };
}

interface RichTextParagraphNode {
  type: "paragraph";
  attrs: {};
}

interface RichTextLinkNode {
  type: "link";
  attrs: { href: string };
}

interface RichTextBoldNode {
  type: "bold";
  attrs: {};
}

interface RichTextBlokNode {
  type: "blok";
  attrs: {};
}

interface RichTextItalicNode {
  type: "italic";
  attrs: {};
}

interface RichTextBulletListNode {
  type: "bullet_list";
  attrs: {};
}

interface RichTextListItemNode {
  type: "list_item";
  attrs: {};
}

interface RichTextOrderedListNode {
  type: "ordered_list";
  attrs: {};
}

interface RichTextImageNode {
  type: "image";
  attrs: {
    id: number;
    alt: string;
    src: string;
    title: string;
    source: string;
    copyright: string;
    meta_data: {};
  };
}

interface RichTextTextStyleNode {
  type: "textStyle";
  attrs: { color: string };
}

type RichTextNodes =
  | RichTextDocNode
  | RichTextTextNode
  | RichTextHeadingNode
  | RichTextParagraphNode
  | RichTextLinkNode
  | RichTextBoldNode
  | RichTextBlokNode
  | RichTextItalicNode
  | RichTextBulletListNode
  | RichTextListItemNode
  | RichTextOrderedListNode
  | RichTextImageNode
  | RichTextTextStyleNode;

export type RichTextNode<
  T extends RichTextNodes["type"] = RichTextNodes["type"]
> = Extract<RichTextNodes, { type: T }> & {
  content?: Array<RichTextNode<T>>;
  marks?: Array<RichTextNode<T>>;
  text?: string;
};

type Handlers<T extends RichTextNode> = {
  [K in T["type"]]: (
    attrs: Extract<T, { type: K }>["attrs"],
    content: Result<T, Handlers<T>>["content"]
  ) => Promise<Record<string, unknown>> extends infer R ? R : never;
};

type Props<T extends RichTextNode, H extends Handlers<T>> = {
  [K in T["type"]]: H[K] extends (
    attrs: Extract<T, { type: K }>["attrs"],
    content: Result<T, Handlers<T>>["content"]
  ) => infer R
    ? Awaited<R>
    : never;
};

type NodeWithProps<T extends RichTextNode, H extends Handlers<T>> = {
  [K in T["type"]]: {
    type: K;
    props: Props<T, H>[K];
    content?: Result<T, H>[];
    marks?: Result<T, H>[];
    text?: string;
  };
};

type Result<
  T extends RichTextNode = RichTextNode,
  H extends Handlers<T> = Handlers<T>
> = NodeWithProps<T, H>[keyof NodeWithProps<T, H>];

/**
 * Recursively iterate over the rich text nodes and change attrs to props, while having hooks
 * in which you can modify or make them useful for the front-end
 */
export async function modify<
  T extends RichTextNode = RichTextNode,
  H extends Handlers<T> = Handlers<T>
>(node: T, handlers: ValidateStructure<H, Handlers<T>>): Promise<Result<T, H>> {
  if (node.type in handlers) {
    const content = node.content
      ? await Promise.all(node.content.map((n) => modify(n as T, handlers)))
      : undefined;
    const marks = node.marks
      ? await Promise.all(node.marks.map((n) => modify(n as T, handlers)))
      : undefined;

    return {
      type: node.type,
      // @ts-expect-error
      props: await handlers[node.type](node.attrs, content),
      content,
      marks,
      text: node.text,
    };
  } else {
    throw new Error(`No handler for node type ${node.type}`);
  }
}

type Children<T> = (T | string)[];

type Transformers<R, I extends Result> = {
  [K in I["type"]]: (
    children: Children<R>,
    props: Extract<I, { type: K }>["props"],
    key: number
  ) => R;
};

/**
 * Recursively loop through the rich text nodes and mutate it from an object
 * to whatever you want.
 */
export function generate<R, I extends Result = Result>(
  input: I,
  transformers: Transformers<R, I>,
  index: number = 0
) {
  let children: Children<R> = [];

  // Figure out if there are children
  // Those can be text (only in case of type=text)
  // Otherwise they are on nodes
  if (input.text) {
    children = [input.text];
  } else if (input.content) {
    children = input.content.map((n, i) => generate(n as I, transformers, i));
  }

  // @ts-expect-error
  let node = transformers[input.type](children, input.props, index);

  // Marks should be wrapped around the current node;
  // Things like Bold, Link or Italic would be in it.
  if (input.marks) {
    for (const mark of input.marks ?? []) {
      // @ts-expect-error
      node = transformers[mark.type]([node], mark.props, index);
    }
  }

  return node as R;
}
