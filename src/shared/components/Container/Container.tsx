import React from "react";
import { cn } from "../../utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

const Container = ({
  children,
  className,
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "sm:px-15 m-3 sm:w-8/10 sm:mx-auto lg:w-240 lg:px-card5 lg:pb-10",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;