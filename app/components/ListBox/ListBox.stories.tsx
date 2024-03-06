import { ListBox } from "~/components/ListBox";
import { FlagAR } from "~/icons/FlagAR";
import { FlagBE } from "~/icons/FlagBE";
import { FlagCL } from "~/icons/FlagCL";
import { FlagDE } from "~/icons/FlagDE";
import { FlagES } from "~/icons/FlagES";
import { FlagFR } from "~/icons/FlagFR";
import { FlagIT } from "~/icons/FlagIT";
import { FlagMX } from "~/icons/FlagMX";
import { FlagNL } from "~/icons/FlagNL";
import { FlagPE } from "~/icons/FlagPE";
import { FlagUK } from "~/icons/FlagUK";
import { FlagUS } from "~/icons/FlagUS";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import { useListState } from "react-stately";

export default {
  title: "Components/ListBox",
  component: ListBox,
} as Meta<typeof ListBox>;

const EUROPA = "Europa";
const NORTH_AMERICA = "NorthAmerica";
const SOUTH_AMERICA = "SouthAmerica";

const CONTINENTS = {
  [EUROPA]: "Europa",
  [NORTH_AMERICA]: "North America",
  [SOUTH_AMERICA]: "South America",
} as const;

const COUNTRIES = [
  {
    flag: <FlagNL />,
    country: "Netherlands",
    continent: EUROPA,
  },
  {
    flag: <FlagBE />,
    country: "Belgium",
    continent: EUROPA,
  },
  {
    flag: <FlagUK />,
    country: "United Kingdom",
    continent: EUROPA,
  },
  {
    flag: <FlagDE />,
    country: "Germany",
    continent: EUROPA,
  },
  {
    flag: <FlagFR />,
    country: "France",
    continent: EUROPA,
  },
  {
    flag: <FlagES />,
    country: "Spain",
    continent: EUROPA,
  },
  {
    flag: <FlagIT />,
    country: "Italy",
    continent: EUROPA,
  },
  {
    flag: <FlagUS />,
    country: "United States of America",
    continent: NORTH_AMERICA,
  },
  {
    flag: <FlagMX />,
    country: "Mexico",
    continent: NORTH_AMERICA,
  },
  {
    flag: <FlagPE />,
    country: "Peru",
    continent: SOUTH_AMERICA,
  },
  {
    flag: <FlagAR />,
    country: "Argentina",
    continent: SOUTH_AMERICA,
  },
  {
    flag: <FlagCL />,
    country: "Chili",
    continent: SOUTH_AMERICA,
  },
] as const;

export const Default: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: COUNTRIES.map((country) => (
      <ListBox.Item textValue={country.country} key={country.country}>
        <ListBox.Label>{country.country}</ListBox.Label>
      </ListBox.Item>
    )),
  });

  return <ListBox state={state} />;
};

export const Description: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: COUNTRIES.map((country) => (
      <ListBox.Item textValue={country.country} key={country.country}>
        <ListBox.Label>{country.country}</ListBox.Label>
        <ListBox.Description>
          {CONTINENTS[country.continent]}
        </ListBox.Description>
      </ListBox.Item>
    )),
  });

  return <ListBox state={state} />;
};

export const Icon: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: COUNTRIES.map((country) => (
      <ListBox.Item textValue={country.country} key={country.country}>
        <ListBox.Icon>{country.flag}</ListBox.Icon>
        <ListBox.Label>{country.country}</ListBox.Label>
      </ListBox.Item>
    )),
  });

  return <ListBox state={state} />;
};

export const Sections: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: Object.entries(CONTINENTS).map(([key, label]) => (
      <ListBox.Section key={key} title={label}>
        {COUNTRIES.filter((country) => country.continent === key).map(
          (country) => (
            <ListBox.Item textValue={country.country} key={country.country}>
              <ListBox.Label>{country.country}</ListBox.Label>
            </ListBox.Item>
          )
        )}
      </ListBox.Section>
    )),
  });

  return <ListBox state={state} />;
};

export const SectionsAndIcon: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: Object.entries(CONTINENTS).map(([key, label]) => (
      <ListBox.Section key={key} title={label}>
        {COUNTRIES.filter((country) => country.continent === key).map(
          (country) => (
            <ListBox.Item textValue={country.country} key={country.country}>
              <ListBox.Icon>{country.flag}</ListBox.Icon>
              <ListBox.Label>{country.country}</ListBox.Label>
            </ListBox.Item>
          )
        )}
      </ListBox.Section>
    )),
  });

  return <ListBox state={state} />;
};

export const DescriptionAndIcon: StoryFn<typeof ListBox> = () => {
  const state = useListState({
    children: COUNTRIES.map((country) => (
      <ListBox.Item textValue={country.country} key={country.country}>
        <ListBox.Icon>{country.flag}</ListBox.Icon>
        <ListBox.Label>{country.country}</ListBox.Label>
        <ListBox.Description>
          {CONTINENTS[country.continent]}
        </ListBox.Description>
      </ListBox.Item>
    )),
  });

  return <ListBox state={state} />;
};
