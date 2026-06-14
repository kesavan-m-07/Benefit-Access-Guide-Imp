import Icon from "@shared/components/Icons/Icon";
import { cn } from "@shared/utils";

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
    <div className={cn("flex items-center gap-2 text-black", className)}>
      <div className="text-black flex items-center justify-center">
        <Icon 
          name="logo" 
          size={iconSize} 
          className="[&_path]:fill-current [&_circle]:fill-current text-black" 
        />
      </div>

      {showText && (
        <p
          className={cn(
            "font-fira font-semibold uppercase tracking-wider text-black text-sm",
            textClassName,
          )}>
          Benefits Access Center
        </p>
      )}
    </div>
  );
};

export default Logo;
