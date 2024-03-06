import * as React from "react";

export function useControlledState<T>(
  prop?: T,
  defaultProp?: T,
  onChange?: (state: T) => void
) {
  // Store the oncontrolled value
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultProp);

  // Track if the component is / was controlled between next and previous render
  const ref = React.useRef(prop !== undefined);

  // Pick the previous controlled value
  const wasControlled = ref.current;

  // Determine if the state value is controlled in the current render
  const isControlled = prop !== undefined;

  if (wasControlled !== isControlled) {
    // eslint-disable-next-line no-console
    console.warn(
      `WARN: The component state changed from ${
        wasControlled ? "controlled" : "uncontrolled"
      } to ${isControlled ? "controlled" : "uncontrolled"}.
        Components should not switch from controlled to uncontrolled (or vice versa), the value should be either controlled or uncontrolled during it's entire lifespan.`
    );
  }

  // Store onChange handler in a ref to prevent the re-executing of the useEffect when using it as uncontrolled state
  const handleChangeRef = React.useRef(onChange);

  React.useEffect(() => {
    handleChangeRef.current = onChange;
  });

  const handleChange = React.useMemo(
    () => (state: T) => {
      handleChangeRef.current?.(state);
    },
    []
  );

  // Mimick state setter in case of a controlled value dispatch
  // the onChange handler if the value is updated, in case of the
  // uncontrolled value update the internal state
  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        if (isControlled) {
          let value = nextValue;

          if (typeof nextValue === "function") {
            value = (nextValue as (prevValue: T) => T)(prop);
          }

          if (value !== prop) {
            handleChange(value as T);
          }
        } else {
          setUncontrolledValue(nextValue);
        }
      },
      [isControlled, prop, handleChange, setUncontrolledValue]
    );

  // Track the previous uncontrolled value
  const prevUncontrolledValue = React.useRef(uncontrolledValue);

  // In case the state is uncontrolled we should track the value
  React.useEffect(() => {
    if (prevUncontrolledValue.current !== uncontrolledValue) {
      handleChange(uncontrolledValue as T);
      prevUncontrolledValue.current = uncontrolledValue;
    }
  }, [uncontrolledValue, prevUncontrolledValue, handleChange]);

  // Pick the value based on if the component is controlled / uncontrolled
  const value = isControlled ? prop : uncontrolledValue;

  return [value, setValue] as const;
}
