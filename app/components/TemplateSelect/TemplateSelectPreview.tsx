import { templateSelectPreview } from "./TemplateSelectPreview.css";

export type TemplateSelectPreviewProps = {
  /**
   * The URL of the image.
   */
  src: string;
  /**
   * Text description of the image.
   */
  alt?: string;
};

export function TemplateSelectPreview(props: TemplateSelectPreviewProps) {
  const { alt, src } = props;

  return (
    <div className={templateSelectPreview.container}>
      <img className={templateSelectPreview.image} src={src} alt={alt} />
    </div>
  );
}
