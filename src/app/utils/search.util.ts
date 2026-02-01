import Fuse from 'fuse.js';
import { Task } from '../models/kanban.model';

/**
 * Searches tasks using fuzzy logic provided by Fuse.js.
 *
 * @param tasks The collection of tasks to search
 * @param query The search query
 * @returns Filtered list of tasks
 */
export function fuzzySearchTasks(tasks: Task[], query: string): Task[] {
  if (!query || query.trim() === '') return tasks;

  const options = {
    keys: ['title', 'description'],
    threshold: 0.4, // Sensitivity (0.0 = perfect match, 1.0 = match anything)
    ignoreLocation: true, // Search everywhere in the string
  };

  const fuse = new Fuse(tasks, options);
  return fuse.search(query).map((result) => result.item);
}
