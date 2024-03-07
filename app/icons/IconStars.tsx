import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconStarsProps = Omit<BaseProps, "children">;

export function IconStars(props: IconStarsProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M15 8c-.1989 0-.3897-.07902-.5303-.21967-.1407-.14065-.2197-.33142-.2197-.53033 0-.39782-.158-.77936-.4393-1.06066-.2813-.2813-.6629-.43934-1.0607-.43934-.1989 0-.3897-.07902-.5303-.21967C12.079 5.38968 12 5.19891 12 5c0-.19891.079-.38968.2197-.53033.1406-.14065.3314-.21967.5303-.21967.3978 0 .7794-.15804 1.0607-.43934S14.25 3.14782 14.25 2.75c0-.19891.079-.38968.2197-.53033C14.6103 2.07902 14.8011 2 15 2c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033 0 .39782.158.77936.4393 1.06066.2813.2813.6629.43934 1.0607.43934.1989 0 .3897.07902.5303.21967C17.921 4.61032 18 4.80109 18 5c0 .19891-.079.38968-.2197.53033-.1406.14065-.3314.21967-.5303.21967-.3978 0-.7794.15804-1.0607.43934S15.75 6.85218 15.75 7.25c0 .19891-.079.38968-.2197.53033C15.3897 7.92098 15.1989 8 15 8ZM8 18c-.26522 0-.51957-.1054-.70711-.2929C7.10536 17.5196 7 17.2652 7 17c0-1.0609-.42143-2.0783-1.17157-2.8284C5.07828 13.4214 4.06087 13 3 13c-.26522 0-.51957-.1054-.70711-.2929C2.10536 12.5196 2 12.2652 2 12c0-.2652.10536-.5196.29289-.7071C2.48043 11.1054 2.73478 11 3 11c1.06087 0 2.07828-.4214 2.82843-1.17157C6.57857 9.07828 7 8.06087 7 7c0-.26522.10536-.51957.29289-.70711C7.48043 6.10536 7.73478 6 8 6s.51957.10536.70711.29289C8.89464 6.48043 9 6.73478 9 7c0 1.06087.42143 2.07828 1.1716 2.82843C10.9217 10.5786 11.9391 11 13 11c.2652 0 .5196.1054.7071.2929S14 11.7348 14 12c0 .2652-.1054.5196-.2929.7071S13.2652 13 13 13c-1.0609 0-2.0783.4214-2.8284 1.1716C9.42143 14.9217 9 15.9391 9 17c0 .2652-.10536.5196-.29289.7071C8.51957 17.8946 8.26522 18 8 18Z"
      />
    </Base>
  );
}
