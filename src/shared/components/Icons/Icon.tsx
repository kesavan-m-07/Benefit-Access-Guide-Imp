import { ICONS, type IconName } from "./iconsRegistry";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const   Icon = ({ name, size = 20, className, strokeWidth }: IconProps) => {
  const LucideIcon = ICONS[name];
  return (
    <LucideIcon size={size} className={className} strokeWidth={strokeWidth} />
  );
};

export default Icon;
