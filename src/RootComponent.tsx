import { Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "@shared/components/ErrorBoundary/ErrorFallBack";

const RootComponent = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RootComponent;
