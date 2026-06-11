import Icon from "../Icons/Icon";
import { cn } from "../../utils";

type LogoProps = {
  className?: string;
  textClassName?: string;
  iconSize?: number;
  showText?: boolean;
};

const Logo = ({
  className,
  textClassName,
  iconSize = 40,
  showText = true,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center ", className)}>
      <Icon name="logo" size={iconSize} />

      {showText && (
        <p
          className={cn(
            "font-fira font-bold uppercase text-dark",
            textClassName,
          )}>
          Benefits Access Center
        </p>
      )}
    </div>
  );
};

export default Logo;
