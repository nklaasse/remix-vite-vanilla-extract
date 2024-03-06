import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import classnames from "classnames";
import * as React from "react";
import { responsive } from "./Responsive.css";

export type ResponsiveProps = {
  children: React.ReactNode;
} & (
  | {
      min?: keyof typeof responsive.variants.min;
      max: keyof typeof responsive.variants.max;
    }
  | {
      min: keyof typeof responsive.variants.min;
      max?: keyof typeof responsive.variants.max;
    }
);

export function Responsive(props: ResponsiveProps) {
  const { children, min, max } = props;

  const [isReyhydrated, setIsReyhydrated] = React.useState(false);

  const matchesMin = useMediaQuery(min ? breakpoints[min] : "");
  const matchesMax = !useMediaQuery(
    max ? breakpoints[max] : "(min-width: 99999999px)"
  );

  React.useEffect(() => {
    setIsReyhydrated(true);
  }, []);

  const shouldRender = !isReyhydrated || (matchesMin && matchesMax);

  return shouldRender ? (
    <div
      className={classnames(
        responsive.container,
        min ? responsive.variants.min[min] : undefined,
        max ? responsive.variants.max[max] : undefined
      )}
    >
      {children}
    </div>
  ) : null;
}
