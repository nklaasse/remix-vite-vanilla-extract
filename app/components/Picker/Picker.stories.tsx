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
import React from "react";
import { Picker } from ".";

export default {
  title: "Components/Picker",
  component: Picker,
  argTypes: { onSelectionChange: { action: "Selection changed" } },
} as Meta<typeof Picker>;

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

export const Default: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Label>{country.country}</Picker.Label>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};

export const Placeholder: StoryFn<typeof Picker> = () => {
  return (
    <Picker placeholder="Pick a country" aria-label="Pick a country">
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Label>{country.country}</Picker.Label>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};

export const Description: StoryFn<typeof Picker> = () => {
  return (
    <Picker aria-label="Pick a country" placeholder="Pick a country">
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Label>{country.country}</Picker.Label>
            <Picker.Description>
              {CONTINENTS[country.continent]}
            </Picker.Description>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};

export const Icon: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Icon>{country.flag}</Picker.Icon>
            <Picker.Label>{country.country}</Picker.Label>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};

export const Sections: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Select>
        {Object.entries(CONTINENTS).map(([key, label]) => (
          <Picker.Section key={key} title={label}>
            {COUNTRIES.filter((country) => country.continent === key).map(
              (country) => (
                <Picker.Item textValue={country.country} key={country.country}>
                  <Picker.Label>{country.country}</Picker.Label>
                </Picker.Item>
              )
            )}
          </Picker.Section>
        ))}
      </Picker.Select>
    </Picker>
  );
};

export const SectionsAndIcon: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Select>
        {Object.entries(CONTINENTS).map(([key, label]) => (
          <Picker.Section key={key} title={label}>
            {COUNTRIES.filter((country) => country.continent === key).map(
              (country) => (
                <Picker.Item textValue={country.country} key={country.country}>
                  <Picker.Icon>{country.flag}</Picker.Icon>
                  <Picker.Label>{country.country}</Picker.Label>
                </Picker.Item>
              )
            )}
          </Picker.Section>
        ))}
      </Picker.Select>
    </Picker>
  );
};

export const DescriptionAndIcon: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Select>
        {COUNTRIES.map((country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Icon>{country.flag}</Picker.Icon>
            <Picker.Label>{country.country}</Picker.Label>
            <Picker.Description>
              {CONTINENTS[country.continent]}
            </Picker.Description>
          </Picker.Item>
        ))}
      </Picker.Select>
    </Picker>
  );
};

export const Reset: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.Reset />
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Label>{country.country}</Picker.Label>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};

export const ContextualHelp: StoryFn<typeof Picker> = () => {
  return (
    <Picker>
      <Picker.Label>Pick a country</Picker.Label>
      <Picker.ContextualHelp>Change the country</Picker.ContextualHelp>
      <Picker.Select items={COUNTRIES}>
        {(country) => (
          <Picker.Item textValue={country.country} key={country.country}>
            <Picker.Label>{country.country}</Picker.Label>
          </Picker.Item>
        )}
      </Picker.Select>
    </Picker>
  );
};
