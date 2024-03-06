import type { StatisticsRowStoryblok } from "../component-types-sb";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { statisticsRow, statistic } from "./StatisticRowContentType.css";
import { useIntl } from "react-intl";

export const loader = async (
  story: StatisticsRowStoryblok,
  _args: LoaderFunctionArgs
) => {
  const statisticsRow = story.statistics.map((statistic) => {
    return {
      number: statistic.number,
      caption: statistic.caption,
      style: statistic.style,
      id: statistic._uid,
    };
  });

  return {
    component: story.component,
    props: {
      statisticsRow,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const intl = useIntl();

  return (
    <div className={statisticsRow.container}>
      <div className={statisticsRow.contentContainer}>
        {data.statisticsRow.map((stat) => {
          const { number, caption, style, id } = stat;
          return (
            <div className={statistic.container} key={id}>
              <div className={statistic.number}>
                {intl.formatNumber(Number(number), {
                  style: style,
                  notation: "compact",
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className={statistic.caption}>{caption}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
