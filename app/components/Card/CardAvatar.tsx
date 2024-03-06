import type { AvatarProps } from "../Avatar";
import { Avatar } from "../Avatar";

type CardAvatarProps = Omit<AvatarProps, "size">;

export function CardAvatar(props: CardAvatarProps) {
  return <Avatar {...props} size={"intro"} />;
}
