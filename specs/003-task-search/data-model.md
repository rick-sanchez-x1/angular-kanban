# Data Model & Interfaces: Task Search

**Feature**: Task Search (003-task-search)

## 1. Search Utility

We will introduce a utility class/file `src/app/utils/search.util.ts`.

### Functions

```typescript
/**
 * Calculates the Levenshtein distance between two strings.
 * @param a First string
 * @param b Second string
 * @returns The number of edits required to transform a to b
 */
export function levenshteinDistance(a: string, b: string): number;

/**
 * Checks if a task matches the search query using fuzzy logic.
 * @param task The task object (title, description)
 * @param query The search query
 * @returns true if matched
 */
export function fuzzyMatchTask(task: Task, query: string): boolean;
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
  if (!query) return tasks;
  return tasks.filter(t => fuzzyMatchTask(t, query));
});
// (Repeat for other columns or refactor to a single filtered source)
```
