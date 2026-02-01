import { Task } from '../models/kanban.model';

/**
 * Calculates the Levenshtein distance between two strings.
 * The Levenshtein distance is the minimum number of single-character edits
 * (insertions, deletions or substitutions) required to change one word into the other.
 *
 * @param a First string
 * @param b Second string
 * @returns The number of edits required to transform a to b
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Checks if a task matches the search query using fuzzy logic.
 *
 * Strategy:
 * 1. Exact substring match (case-insensitive)
 * 2. Fuzzy match on words (using Levenshtein distance)
 *
 * @param task The task object (title, description)
 * @param query The search query
 * @returns true if matched
 */
export function fuzzyMatchTask(task: Task, query: string): boolean {
  if (!query || query.trim() === '') return true;

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedTitle = task.title.toLowerCase();
  const normalizedDesc = (task.description || '').toLowerCase();

  // 1. Substring Match (Fastest)
  if (
    normalizedTitle.includes(normalizedQuery) ||
    normalizedDesc.includes(normalizedQuery)
  ) {
    return true;
  }

  // 2. Fuzzy Match (Levenshtein)
  // Only try fuzzy matching if the query is a single word or short enough to be a typo of a word
  // Splitting by spaces to check individual words
  const words = [
    ...normalizedTitle.split(/\s+/),
    ...normalizedDesc.split(/\s+/),
  ];
  const queryWords = normalizedQuery.split(/\s+/);

  // Simple heuristic: If any word in the task is "close enough" to any word in the query
  // Threshold: 2 edits for words > 4 chars, 1 edit for words <= 4 chars
  for (const qWord of queryWords) {
    if (qWord.length < 3) continue; // Skip very short words for fuzzy matching to avoid noise

    const foundMatch = words.some((word) => {
      // Don't fuzz match if length difference is too big
      if (Math.abs(word.length - qWord.length) > 2) return false;

      const dist = levenshteinDistance(word, qWord);
      const threshold = word.length > 4 ? 2 : 1;
      return dist <= threshold;
    });

    if (foundMatch) return true;
  }

  return false;
}
