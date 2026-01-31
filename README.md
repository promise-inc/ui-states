# @promisejs/ui-states

Auto-generated skeleton loading states from real DOM — zero config React component.

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
npm install @promisejs/ui-states
```

**Peer dependencies**: `react >= 18`, `react-dom >= 18`

**Note**: This library outputs Tailwind CSS classes (`animate-pulse`, `bg-neutral-200/60`, `rounded-*`, `flex`, `grid`, etc). Make sure your Tailwind config scans this package:

```js
// tailwind.config.js
content: [
  // ...your paths
  './node_modules/@promisejs/ui-states/dist/**/*.{js,cjs}',
]
```

## Quick Start

```tsx
import { UIStates } from '@promisejs/ui-states';

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
import { UIStates } from '@promisejs/ui-states';
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

## License

MIT

---

Developed by [Promise Inc.](https://promise.codes)
