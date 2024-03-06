import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import type { ElementNode, LexicalNode, TextFormatType } from "lexical";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isElementNode,
  $isLineBreakNode,
  $isTextNode,
  TextNode,
} from "lexical";

function generateHtmlFromLineBreakNode() {
  return document.createElement("br");
}

function generateHtmlFromTextNode(node: TextNode) {
  const text = document.createTextNode(node.getTextContent());

  let result: Text | HTMLElement = text;

  if (node.hasFormat("bold")) {
    const element = document.createElement("strong");
    element.appendChild(result);
    result = element;
  }

  if (node.hasFormat("italic")) {
    const element = document.createElement("em");
    element.appendChild(result);
    result = element;
  }

  if (node.hasFormat("underline")) {
    const element = document.createElement("u");
    element.appendChild(result);
    result = element;
  }

  if (node.hasFormat("strikethrough")) {
    const element = document.createElement("s");
    element.appendChild(result);
    result = element;
  }

  return result;
}

function generateHtmlFromElementNode(node: ElementNode) {
  const children = node.getChildren();

  let element;

  const type = node.getType();

  if (type === "paragraph") {
    element = document.createElement("p");

    if (children.length === 0) {
      element.appendChild(document.createElement("br"));
    }
  } else if (type === "list") {
    const listType = node.getListType();

    if (listType === "number") {
      element = document.createElement("ol");
    } else if (listType === "bullet") {
      element = document.createElement("ul");
    } else {
      return;
    }
  } else if (type === "listitem") {
    element = document.createElement("li");
  } else if (type === "link") {
    element = document.createElement("a");

    element.setAttribute("href", node.getURL());
    element.setAttribute("rel", "noopener noreferrer");
    element.setAttribute("target", "_blank");
  } else {
    return;
  }

  for (const child of children) {
    const result = generateHtmlFromNode(child);

    if (result) {
      element.appendChild(result);
    }
  }

  return element;
}

function generateHtmlFromNode(node: LexicalNode) {
  if ($isLineBreakNode(node)) {
    return generateHtmlFromLineBreakNode();
  } else if ($isTextNode(node)) {
    return generateHtmlFromTextNode(node);
  } else if ($isElementNode(node)) {
    return generateHtmlFromElementNode(node);
  }
}

export function $generateHtmlFromNodes() {
  let output = "";

  const children = $getRoot().getChildren();

  for (const child of children) {
    const result = generateHtmlFromNode(child);

    if (result instanceof Text) {
      output += result.wholeText;
    } else if (result instanceof Element) {
      output += result.outerHTML;
    }
  }

  return output;
}

function applyFormatToLexicalNodes(
  nodes: Array<LexicalNode>,
  format: TextFormatType
) {
  for (const node of nodes) {
    if (node instanceof TextNode) {
      if (!node.hasFormat(format)) {
        node.toggleFormat(format);
      }
    }
  }
}

function generateNodeFromDOMNode(domNode: Node) {
  let node: LexicalNode | undefined = undefined;

  const children: Array<LexicalNode> = [];

  if (domNode.hasChildNodes()) {
    for (const childNode of domNode.childNodes) {
      const result = generateNodeFromDOMNode(childNode);

      if (result?.length > 0) {
        children.push(...result);
      }
    }
  }

  if (domNode instanceof Element) {
    const tagName = domNode.tagName;

    if (tagName === "P") {
      node = $createParagraphNode();
    } else if (tagName === "OL") {
      node = $createListNode("number");
    } else if (tagName === "UL") {
      node = $createListNode("bullet");
    } else if (tagName === "LI") {
      node = $createListItemNode();
    } else if (tagName === "A") {
      node = $createLinkNode(domNode.getAttribute("href") || "", {
        target: domNode.getAttribute("target"),
        rel: domNode.getAttribute("rel"),
      });
    } else if (tagName === "BR") {
      return [];
    } else if (tagName === "STRONG") {
      applyFormatToLexicalNodes(children, "bold");
    } else if (tagName === "EM") {
      applyFormatToLexicalNodes(children, "italic");
    } else if (tagName === "U") {
      applyFormatToLexicalNodes(children, "underline");
    } else if (tagName === "S") {
      applyFormatToLexicalNodes(children, "strikethrough");
    }

    if (node == undefined) {
      return children;
    }
  } else if (domNode instanceof Text) {
    return [$createTextNode(domNode.wholeText)];
  }

  if (node) {
    if (children.length > 0) {
      if ($isElementNode(node)) {
        node.append(...children);
      }
    }

    return [node];
  }

  return [];
}

export function $generateNodesFromDOM(dom: Document) {
  const nodes: Array<LexicalNode> = [];

  const elements: Array<Node> = dom.body ? Array.from(dom.body.childNodes) : [];

  for (const element of elements) {
    const result = generateNodeFromDOMNode(element);

    if (result) {
      nodes.push(...result);
    }
  }

  // If there is only one node and it is a text node, we need to wrap it in a paragraph as well.
  // Otherwise, we will have issues with lexical rendering.
  if (nodes.length === 1 && nodes[0] instanceof TextNode) {
    const root = $createParagraphNode();

    root.append(...nodes);

    return [root];
  } else {
    return nodes;
  }
}
