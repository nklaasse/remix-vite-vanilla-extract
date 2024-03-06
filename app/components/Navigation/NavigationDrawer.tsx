import { Button } from "~/components/Button";
import { IconCross } from "~/icons/IconCross";
import { IconMenu } from "~/icons/IconMenu";
import { useIntl } from "react-intl";
import * as React from "react";
import type { MenuProps as ReactAriaMenuProps } from "react-aria-components";
import {
  Dialog,
  Menu as ReactAriaMenu,
  MenuTrigger as ReactAriaMenuTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { Layer, useLayerIndex } from "../Layer";
import { ElementTypeProvider, NavigationContext } from "./Navigation";
import { menu, navigationDrawer } from "./NavigationDrawer.css";

function Trigger() {
  const intl = useIntl();

  return (
    <Button
      size="compact"
      variant="tertiary"
      aria-label={intl.formatMessage({
        id: "components.navigationDrawer.triggerLabel",
        description:
          "Label which is used for the trigger button which opens the navigation drawer component",
        defaultMessage: "Open menu",
      })}
    >
      <Button.Icon>
        <IconMenu />
      </Button.Icon>
    </Button>
  );
}

type MenuProps<T> = Pick<ReactAriaMenuProps<T>, "items" | "children">;

function Menu<T extends object>(props: MenuProps<T>) {
  const { children, ...otherProps } = props;

  const context = React.useContext(NavigationContext);
  const { menuProps } = context.props;

  return (
    <ReactAriaMenu
      selectionMode="single"
      {...otherProps}
      {...menuProps}
      className={menu.container}
    >
      {children}
    </ReactAriaMenu>
  );
}

type DrawerProps = {
  children: React.ReactNode;
};

function Drawer(props: DrawerProps) {
  const { children } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  const index = useLayerIndex("modal");

  return (
    <ModalOverlay
      className={navigationDrawer.container}
      style={{
        zIndex: index,
      }}
    >
      <Layer index={index}>
        <div className={navigationDrawer.underlay} />
        <Modal
          className={navigationDrawer.overlay}
          isDismissable
          isKeyboardDismissDisabled
          ref={ref}
        >
          <Dialog className={navigationDrawer.dialog}>
            {({ close }) => (
              <>
                <div className={navigationDrawer.close}>
                  <Button
                    size="compact"
                    variant="tertiary"
                    onPress={close}
                    excludeFromTabOrder
                  >
                    <Button.Icon>
                      <IconCross />
                    </Button.Icon>
                  </Button>
                </div>
                <div className={navigationDrawer.content}>{children}</div>
              </>
            )}
          </Dialog>
        </Modal>
      </Layer>
    </ModalOverlay>
  );
}

type NavigationDrawerProps<T> = MenuProps<T>;

export function NavigationDrawer<T extends object>(
  props: NavigationDrawerProps<T>
) {
  const { children } = props;

  return (
    <ElementTypeProvider type="drawer">
      <ReactAriaMenuTrigger>
        <Trigger />

        <Drawer>
          <Menu {...props}>{children}</Menu>
        </Drawer>
      </ReactAriaMenuTrigger>
    </ElementTypeProvider>
  );
}
