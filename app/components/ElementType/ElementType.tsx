import * as React from "react";

/**
 * Helper method which creates a context provider and additional hook, which can be used
 * to determine which type of component to render in the component tree.
 *
 * For example there are cases that we use the same component in the compound component pattern
 * which can result in a different component based on their parent.
 *
 * As an example:
 *
 * ActionGroup.Label
 * - ActionGroup.Label in case a Button is the parent
 * - Menu.Label in case a Menu.Item is the parent
 */
export const createElementTypeContext = <T extends string>() => {
  const ElementTypeContext = React.createContext<T>(null!);

  type ElementTypeProviderProps = {
    children: React.ReactNode;
    type: T;
  };

  /**
   * @private
   *
   * Provider which is used to "check" the rendered parent in the
   * ActionGroup.Icon and ActionGroup.Label component
   */
  function ElementTypeProvider(props: ElementTypeProviderProps) {
    const { children, type } = props;

    return (
      <ElementTypeContext.Provider value={type}>
        {children}
      </ElementTypeContext.Provider>
    );
  }

  /**
   * @private
   *
   * Reads the rendered element type so we can return the right elements
   */
  const useElementType = () => {
    return React.useContext(ElementTypeContext);
  };

  return {
    ElementTypeProvider,
    useElementType,
  };
};
