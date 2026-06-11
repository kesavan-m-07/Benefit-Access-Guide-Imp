import {
  DropDownIcon,
  HandIcon,
  LockIcon,
  LogoIcon,
  TickIcon,
} from "./customIcons";

export const ICONS = {
  lock: LockIcon,
  hand: HandIcon,
  tick: TickIcon,
  logo: LogoIcon,
  dropdown: DropDownIcon,
} as const;

export type IconName = keyof typeof ICONS;
