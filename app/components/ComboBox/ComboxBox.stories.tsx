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
import { ComboBox } from "./ComboBox";

export default {
  title: "Components/ComboBox",
  component: ComboBox,
} as Meta<typeof ComboBox>;

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

export const Default: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {COUNTRIES.map((country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Label>{country.country}</ComboBox.Label>
          </ComboBox.Item>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const Placeholder: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox placeholder="Pick a country" aria-label="Pick a country">
      <ComboBox.Select>
        {COUNTRIES.map((country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Label>{country.country}</ComboBox.Label>
          </ComboBox.Item>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const Description: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {COUNTRIES.map((country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Label>{country.country}</ComboBox.Label>
            <ComboBox.Description>
              {CONTINENTS[country.continent]}
            </ComboBox.Description>
          </ComboBox.Item>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const Icon: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {COUNTRIES.map((country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Icon>{country.flag}</ComboBox.Icon>
            <ComboBox.Label>{country.country}</ComboBox.Label>
          </ComboBox.Item>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const Sections: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {Object.entries(CONTINENTS).map(([key, label]) => (
          <ComboBox.Section key={key} title={label}>
            {COUNTRIES.filter((country) => country.continent === key).map(
              (country) => (
                <ComboBox.Item
                  textValue={country.country}
                  key={country.country}
                >
                  <ComboBox.Label>{country.country}</ComboBox.Label>
                </ComboBox.Item>
              )
            )}
          </ComboBox.Section>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const SectionsAndIcon: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {Object.entries(CONTINENTS).map(([key, label]) => (
          <ComboBox.Section key={key} title={label}>
            {COUNTRIES.filter((country) => country.continent === key).map(
              (country) => (
                <ComboBox.Item
                  textValue={country.country}
                  key={country.country}
                >
                  <ComboBox.Icon>{country.flag}</ComboBox.Icon>
                  <ComboBox.Label>{country.country}</ComboBox.Label>
                </ComboBox.Item>
              )
            )}
          </ComboBox.Section>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const DescriptionAndIcon: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Select>
        {COUNTRIES.map((country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Icon>{country.flag}</ComboBox.Icon>
            <ComboBox.Label>{country.country}</ComboBox.Label>
            <ComboBox.Description>
              {CONTINENTS[country.continent]}
            </ComboBox.Description>
          </ComboBox.Item>
        ))}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const Reset: StoryFn<typeof ComboBox> = () => {
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>(null);

  return (
    <ComboBox selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.Reset
        onPress={() => {
          setSelectedKey(null);
        }}
      />
      <ComboBox.Select items={COUNTRIES}>
        {(country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Label>{country.country}</ComboBox.Label>
          </ComboBox.Item>
        )}
      </ComboBox.Select>
    </ComboBox>
  );
};

export const ContextualHelp: StoryFn<typeof ComboBox> = () => {
  return (
    <ComboBox>
      <ComboBox.Label>Pick a country</ComboBox.Label>
      <ComboBox.ContextualHelp>Change the country</ComboBox.ContextualHelp>
      <ComboBox.Select items={COUNTRIES}>
        {(country) => (
          <ComboBox.Item textValue={country.country} key={country.country}>
            <ComboBox.Label>{country.country}</ComboBox.Label>
          </ComboBox.Item>
        )}
      </ComboBox.Select>
    </ComboBox>
  );
};
