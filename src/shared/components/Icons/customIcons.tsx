import Lock from "../../../assets/icons/lock.svg?react";
import Hand from "../../../assets/icons/hand.svg?react";
import Tick from "../../../assets/icons/tick.svg?react";
import Logo from "../../../assets/icons/logo.svg?react";
import DropDown from "../../../assets/icons/drop-down.svg?react";

type SvgIconProps = { size?: number; className?: string; strokeWidth?: number };

export const LockIcon = ({
  size = 20,
  className,
  strokeWidth,
}: SvgIconProps) => (
  <Lock
    width={size}
    height={size}
    className={className}
    strokeWidth={strokeWidth}
  />
);

export const HandIcon = ({
  size = 20,
  className,
  strokeWidth,
}: SvgIconProps) => (
  <Hand
    width={size}
    height={size}
    className={className}
    strokeWidth={strokeWidth}
  />
);

export const TickIcon = ({
  size = 20,
  className,
  strokeWidth,
}: SvgIconProps) => (
  <Tick
    width={size}
    height={size}
    className={className}
    strokeWidth={strokeWidth}
  />
);

export const LogoIcon = ({
  size = 20,
  className,
  strokeWidth,
}: SvgIconProps) => (
  <Logo
    width={size}
    height={size}
    className={className}
    strokeWidth={strokeWidth}
  />
);

export const DropDownIcon = ({
  size = 20,
  className,
  strokeWidth,
}: SvgIconProps) => (
  <DropDown
    width={size}
    height={size}
    className={className}
    strokeWidth={strokeWidth}
  />
);
