# @promise-inc/ui-states

Auto-generated skeleton loading states from real DOM — zero config React component.

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/ui-states/main/assets/usage.svg" alt="UI States usage — code example" width="680" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/ui-states/main/assets/demo.svg" alt="UI States demo — component to skeleton" width="680" />
</p>

## Why?

Building skeleton loading states is tedious and fragile:

- You have to manually create skeleton components that mirror real layouts
- Every UI change means updating skeletons too
- Most skeleton libraries require explicit configuration per component
- Inconsistent loading states across the app

`ui-states` generates **accurate skeletons automatically** from your real DOM — zero manual work.

## Features

- **Auto-skeleton**: Generates skeleton loading states based on your actual component DOM structure
- **Zero config**: Just wrap your component — no manual skeleton building
- **TanStack Query support**: Pass query objects directly
- **Smart caching**: Cache skeleton trees in sessionStorage with viewport-aware invalidation
- **Dark mode**: Built-in dark mode support via Tailwind `dark:` variants
- **Accessible**: Proper `aria-busy`, `role="status"`, and `aria-label` attributes
- **Tree-shakeable**: Import only what you need
- **Lightweight**: No dependencies besides React

## Install

```bash
npm install @promise-inc/ui-states
```

**Peer dependencies**: `react >= 18`, `react-dom >= 18`

**Note**: This library outputs Tailwind CSS classes (`animate-pulse`, `bg-neutral-200/60`, `rounded-*`, `flex`, `grid`, etc). Make sure your Tailwind config scans this package:

```js
// tailwind.config.js
content: [
  // ...your paths
  './node_modules/@promise-inc/ui-states/dist/**/*.{js,cjs}',
]
```

## Quick Start

```tsx
import { UIStates } from '@promise-inc/ui-states';

function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <UIStates data={products} loading={loading} error={error}>
      <ProductList products={products} />
    </UIStates>
  );
}
```

## Usage with TanStack Query

```tsx
import { UIStates } from '@promise-inc/ui-states';
import { useQuery } from '@tanstack/react-query';

function ProductsPage() {
  const query = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  return (
    <UIStates query={query}>
      <ProductList products={query.data} />
    </UIStates>
  );
}
```

## Custom Empty and Error States

```tsx
<UIStates
  data={data}
  loading={isLoading}
  error={error}
  emptyState={<MyCustomEmptyView />}
  errorState={(error, retry) => (
    <MyCustomError error={error} onRetry={retry} />
  )}
>
  <ProductList />
</UIStates>
```

## Caching

Enable skeleton caching to avoid re-measuring the DOM on subsequent loads:

```tsx
<UIStates
  query={query}
  enableCache
  cacheKey="products-page"
>
  <ProductList products={query.data} />
</UIStates>
```

Cache is stored in `sessionStorage` and auto-invalidates when:
- TTL expires (5 minutes)
- Viewport size changes significantly (> 50px difference)

## API Reference

### `<UIStates>` Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | The content to render on success |
| `data` | `unknown` | Data to check for empty state |
| `loading` | `boolean` | Manual loading flag |
| `error` | `unknown` | Manual error value |
| `query` | `QueryLike` | TanStack Query result object |
| `emptyState` | `ReactNode` | Custom empty state component |
| `errorState` | `ReactNode \| (error, retry?) => ReactNode` | Custom error state |
| `emptyCheck` | `(data: unknown) => boolean` | Custom empty data checker |
| `enableCache` | `boolean` | Enable skeleton caching (default: `false`) |
| `cacheKey` | `string` | Cache key for sessionStorage |
| `className` | `string` | Class for the wrapper div |
| `skeletonClassName` | `string` | Class for the skeleton container |

### Exported Hooks

| Hook | Description |
|------|-------------|
| `useUIState` | Resolves current UI state from props or query |
| `useSkeletonTree` | Coordinates DOM measurement and skeleton generation |
| `useResizeObserver` | ResizeObserver with debounce |

### Exported Components

| Component | Description |
|-----------|-------------|
| `UIStates` | Main orchestrator component |
| `SkeletonRenderer` | Renders a skeleton tree |
| `ErrorRenderer` | Default error state |
| `EmptyRenderer` | Default empty state |
| `FallbackSkeleton` | Generic fallback skeleton |

## How It Works

1. When `loading` is active, children are rendered with `visibility: hidden` and `position: absolute` for DOM measurement
2. The **DOM Walker** recursively traverses the hidden tree, measuring each element's bounding rect and computed styles
3. The **Skeleton Generator** maps the measured tree into `SkeletonNode[]` with dimensions, layout info (flex/grid), gaps, and border-radius
4. The **Skeleton Renderer** renders the tree as `div` elements with Tailwind classes (`animate-pulse`, `bg-neutral-200/60`)
5. When loading ends, the skeleton is removed and real children are shown

## How to report bugs

To report a bug, please first read our guide on [opening issues](https://github.com/promise-inc/ui-states/issues).

## How to contribute code

To open a pull request, please first read our guide on [opening pull requests](https://github.com/promise-inc/ui-states/pulls), which outlines our process for RFCs and pull requests.

## Also by Promise Inc.

| Package | Description |
|---------|-------------|
| [`@promise-inc/ai-guard`](https://github.com/promise-inc/ai-guard) | Detect AI-generated code patterns |
| [`@promise-inc/ps-guard`](https://github.com/promise-inc/ps-guard) | Lighthouse-based performance guard |
| [`@promise-inc/fs-guard`](https://github.com/promise-inc/fs-guard) | Validate project folder and file structure |
| [`@promise-inc/devlog`](https://github.com/promise-inc/devlog) | Logger with automatic context (file + line) |
| [`@promise-inc/dev-reel`](https://github.com/promise-inc/dev-reel) | Animated SVG previews for READMEs |

---

Developed by [Promise Inc.](https://promise.codes)

## License

MIT © [Promise Inc.](https://promise.codes)
