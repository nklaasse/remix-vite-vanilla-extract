import { Link } from "~/components/Link";
import type { Meta, StoryFn } from "@storybook/react";
import { Card } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
} as Meta<typeof Card>;

export const Default: StoryFn<typeof Card> = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <Card>
        <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
        <Card.Heading level={2}>
          <Link href="#">
            Crafting an Effective CV: A Step-by-Step Guide to Showcase Your
            Skills
          </Link>
        </Card.Heading>
        <Card.Meta>
          <Card.Text>
            <Link href="">
              <Link.Label>CV</Link.Label>
            </Link>
          </Card.Text>
          <Card.Text>12 Feb 2023</Card.Text>
          <Card.Text>3 mins read</Card.Text>
        </Card.Meta>
        <Card.Author>
          <Card.Avatar
            src="https://a.storyblok.com/f/203421/600x600/060775a444/author1-yellow.png"
            alt=""
          />
          <Card.Text>Artöm</Card.Text>
        </Card.Author>
      </Card>
    </div>
  );
};

export const MultipleCards: StoryFn<typeof Card> = () => {
  return (
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <div style={{ display: "flex", width: "1440px" }}>
        <Card>
          <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
          <Card.Heading level={2}>
            <Link href="#">
              Why My Cat Is Smarter Than Your Dog: A Hilarious Deep-Dive into
              Feline Intelligence
            </Link>
          </Card.Heading>
          <Card.Meta>
            <Card.Text>
              <Link href="">
                <Link.Label>CV</Link.Label>
              </Link>
            </Card.Text>
            <Card.Text>02 Apr 2023</Card.Text>
            <Card.Text>3 mins read</Card.Text>
          </Card.Meta>
          <Card.Author>
            <Card.Avatar
              src="https://a.storyblok.com/f/203421/600x600/e18c7ff06b/author2-blue.png"
              alt=""
            />
            <Card.Text>Karien</Card.Text>
          </Card.Author>
        </Card>
        <Card>
          <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
          <Card.Heading level={2}>
            <Link href="#">
              Resume Writing Strategies: Key Elements to Make Your Application
              Stand Out
            </Link>
          </Card.Heading>
          <Card.Meta>
            <Card.Text>
              <Link href="">
                <Link.Label>Carreer</Link.Label>
              </Link>
            </Card.Text>
            <Card.Text>01 Jun 2021</Card.Text>
            <Card.Text>7 mins read</Card.Text>
          </Card.Meta>
          <Card.Author>
            <Card.Avatar
              src="https://a.storyblok.com/f/203421/600x600/060775a444/author1-yellow.png"
              alt=""
            />
            <Card.Text>Artöm</Card.Text>
          </Card.Author>
        </Card>
        <Card>
          <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
          <Card.Heading level={2}>
            <Link href="#">
              <Link.Label>
                Mastering the Art of CV Design: Tips for a Professional and
                Visually Appealing Resume
              </Link.Label>
            </Link>
          </Card.Heading>
          <Card.Meta>
            <Card.Text>
              <Link href="">
                <Link.Label>Cover Letter</Link.Label>
              </Link>
            </Card.Text>
            <Card.Text>12 Feb 2023</Card.Text>
            <Card.Text>9 mins read</Card.Text>
          </Card.Meta>
          <Card.Author>
            <Card.Avatar
              src="https://a.storyblok.com/f/203421/600x600/e18c7ff06b/author2-blue.png"
              alt=""
            />
            <Card.Text>Karien</Card.Text>
          </Card.Author>
        </Card>
        <Card>
          <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
          <Card.Heading level={2}>
            <Link href="#">
              <Link.Label>
                Tailoring Your CV for Success: Customizing Your Resume to Land
                Your Dream Job
              </Link.Label>
            </Link>
          </Card.Heading>
          <Card.Meta>
            <Card.Text>
              <Link href="">
                <Link.Label>CV</Link.Label>
              </Link>
            </Card.Text>
            <Card.Text>23 Jan 2022</Card.Text>
            <Card.Text>10 mins read</Card.Text>
          </Card.Meta>
          <Card.Author>
            <Card.Avatar
              src="https://a.storyblok.com/f/203421/600x600/060775a444/author1-yellow.png"
              alt=""
            />
            <Card.Text>Artöm</Card.Text>
          </Card.Author>
        </Card>
      </div>
    </div>
  );
};

export const WithoutMeta: StoryFn<typeof Card> = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <Card>
        <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
        <Card.Heading level={2}>
          <Link href="#">
            Crafting an Effective CV: A Step-by-Step Guide to Showcase Your
            Skills
          </Link>
        </Card.Heading>
        <Card.Author>
          <Card.Avatar
            src="https://a.storyblok.com/f/203421/600x600/060775a444/author1-yellow.png"
            alt=""
          />
          <Card.Text>Artöm</Card.Text>
        </Card.Author>
      </Card>
    </div>
  );
};

export const WithoutAuthor: StoryFn<typeof Card> = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <Card>
        <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
        <Card.Heading level={2}>
          <Link href="#">
            Crafting an Effective CV: A Step-by-Step Guide to Showcase Your
            Skills
          </Link>
        </Card.Heading>
        <Card.Meta>
          <Card.Text>
            <Link href="">CV</Link>
          </Card.Text>
          <Card.Text>12 Feb 2023</Card.Text>
          <Card.Text>3 mins read</Card.Text>
        </Card.Meta>
      </Card>
    </div>
  );
};

export const WithoutMetaAndAuthor: StoryFn<typeof Card> = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <Card>
        <Card.Image url="https://a.storyblok.com/f/203421/1320x1120/34b0a769e5/how-to-write-a-good-cv-main.webp" />
        <Card.Heading level={2}>
          <Link href="#">
            <Link.Label>
              Crafting an Effective CV: A Step-by-Step Guide to Showcase Your
              Skills
            </Link.Label>
          </Link>
        </Card.Heading>
      </Card>
    </div>
  );
};
