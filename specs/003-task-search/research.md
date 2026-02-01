# Research: Custom Fuzzy Search & Highlighting

**Feature**: Task Search (003-task-search)
**Date**: 2026-02-01

## 1. Fuzzy Search Algorithm (Custom Implementation)

**Requirement**: Implement fuzzy search without external libraries (e.g. Fuse.js).
**Goal**: Match "Meting" to "Meeting" (typo tolerance) and "doc" to "Documentation" (substring).

### Option A: Levenshtein Distance
Calculates the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other.

*   **Pros**: Standard metric for string similarity. Good for typos.
*   **Cons**: O(n*m) complexity. Can be expensive if not optimized, but fine for short titles/descriptions. Doesn't inherently handle "substrings" well unless modified (e.g. finding "doc" in "documentation" usually has a high distance due to length difference, unless we check for substring containment first or use "partial" logic).

### Option B: Trigram / N-gram Similarity
Break strings into chunks of N characters and count overlaps.

*   **Pros**: Very robust for fuzzy matching.
*   **Cons**: More complex to implement from scratch than Levenshtein.

### Option C: Hybrid Approach (Filter + Score)
1.  **Substring Check**: If `text.includes(query)`, it's a match (Score: 100).
2.  **Levenshtein Check**: If not a substring, check Levenshtein distance against words. If distance <= threshold (e.g. 2), it's a match.

### Decision
**Use a Hybrid Approach (substring + simple Levenshtein)**.
For the scale of a Kanban board (hundreds of tasks), a simple Levenshtein implementation is performant enough.
We will implement a function `fuzzyMatch(text: string, query: string): boolean`.

**Algorithm Logic**:
1. Normalize both to lowercase.
2. If `text` contains `query`, return `true`.
3. If not, split `text` into words.
4. For each word, calculate Levenshtein distance to `query`.
5. If distance < Threshold (e.g. 2 for words > 4 chars), return `true`.

## 2. Text Highlighting

**Requirement**: Visually highlight matching text segments.

### Approach: Angular Pipe
Create a `HighlightPipe` that takes `value` and `args` (search term).

*   **Logic**:
    *   If search term is empty, return original text.
    *   Find all occurrences of the term (using Regex with 'gi' flags for substring matches).
    *   For fuzzy matches (typos), we might not be able to highlight the *exact* typo match easily unless we return the matched indices from the search function.
    *   **Refinement**: The spec asks to highlight matching terms. Highlighting exact substrings is easy. Highlighting "fuzzy" matches (e.g. user typed "Meting", text has "Meeting") is harder because we need to know *what* matched.

### Decision on Highlighting
For MVP/P3 (Priority 3), we will primarily highlight **exact substring matches** of the search term.
If we have time/complexity budget, we can try to highlight the word that fuzzy-matched, but standard "highlight" usually implies highlighting the query string.
Given the spec mentions "highlight the keyword in the task itself", if the user types "Meting" and we find "Meeting", ideally we highlight "Meeting".
*   **Implementation**: The `fuzzyMatch` function could return a `MatchResult` object instead of boolean, indicating *which part* matched.
*   **Simplified**: We will stick to highlighting exact matches first. If the user types "Meeting" (correctly), it highlights. If they type "Meting" (typo), the task shows up, but maybe nothing is highlighted, or we highlight the whole word "Meeting" if we identify it as the fuzzy match.

**Selected Strategy**:
Create a `HighlightPipe` that accepts the search query. It will use a Regex to replace matches with `<span class="bg-yellow-200 dark:bg-yellow-900">...</span>`.
To support fuzzy highlighting, we would need to pass the *target* word that matched back to the UI, which complicates the data flow. We will start with exact match highlighting for P1/P3 and accept that typo-searches might not highlight the corrected word in the first iteration unless it's a simple fix.

## 3. State Management

**Location**: `BoardComponent` or `KanbanStore`.
**Decision**: Keep search state in `BoardComponent` (or a `KanbanBoardStore` if using ComponentStore) for now, or just a simple signal in the component. The filtering logic can be a computed signal: `filteredTasks = computed(() => allTasks().filter(t => search(t, query())))`.
This avoids polluting the global app state with transient UI search terms.
