import type { UIStatesProps } from "../types";
import { useUIState } from "../hooks/use-ui-state";
import { useSkeletonTree } from "../hooks/use-skeleton-tree";
import { SkeletonRenderer } from "../renderers/skeleton-renderer";
import { ErrorRenderer } from "../renderers/error-renderer";
import { EmptyRenderer } from "../renderers/empty-renderer";
import { FallbackSkeleton } from "../utils/fallback-skeleton";
import { cn } from "../utils/cn";

export function UIStates(props: UIStatesProps) {
  const {
    children,
    emptyState,
    errorState,
    enableCache = false,
    cacheKey,
    className,
    skeletonClassName,
  } = props;

  const { state, error, retry } = useUIState(props);
  const { tree, measureRef, hasMeasured } = useSkeletonTree({
    isLoading: state === "loading",
    enableCache,
    cacheKey,
  });

  if (state === "error") {
    if (errorState) {
      if (typeof errorState === "function") {
        return <>{errorState(error, retry)}</>;
      }
      return <>{errorState}</>;
    }
    return <ErrorRenderer error={error} retry={retry} className={className} />;
  }

  if (state === "empty") {
    if (emptyState) {
      return <>{emptyState}</>;
    }
    return <EmptyRenderer className={className} />;
  }

  if (state === "loading") {
    return (
      <div className={cn("relative", className)}>
        {/* Hidden children for DOM measurement */}
        <div
          ref={measureRef}
          aria-hidden="true"
          style={{
            visibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
            overflow: "hidden",
            height: 0,
          }}
        >
          {children}
        </div>

        {/* Skeleton overlay */}
        {hasMeasured && tree ? (
          <SkeletonRenderer tree={tree} className={skeletonClassName} />
        ) : (
          <FallbackSkeleton className={skeletonClassName} />
        )}
      </div>
    );
  }

  return <>{children}</>;
}
