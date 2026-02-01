# Data Model & Interfaces: Task Search

**Feature**: Task Search (003-task-search)

## 1. Search Utility

We use **Fuse.js** for fuzzy search logic in `src/app/utils/search.util.ts`.

### Functions

```typescript
/**
 * Searches tasks using fuzzy logic provided by Fuse.js.
 * @param tasks The collection of tasks to search
 * @param query The search query
 * @returns Filtered list of tasks
 */
export function fuzzySearchTasks(tasks: Task[], query: string): Task[];
```

## 2. Highlighting Pipe

`src/app/pipes/highlight.pipe.ts`

```typescript
@Pipe({
  name: 'highlight',
  standalone: true // or part of a module
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string;
}
```

## 3. Component State (BoardComponent)

We will use Angular Signals to handle the reactive filtering.

```typescript
// BoardComponent
searchQuery = signal<string>(''); // The current input
// Derived signal
filteredTodoTasks = computed(() => {
  const query = this.searchQuery();
  const tasks = this.todoTasks();
  return fuzzySearchTasks(tasks, query);
});
// (Repeat for other columns)
```
