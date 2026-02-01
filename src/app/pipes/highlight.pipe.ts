import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search || !value) {
      return value;
    }

    // Escape special characters in the search term to prevent regex errors
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regex for case-insensitive matching
    const pattern = new RegExp(escapedSearch, 'gi');

    // Replace matches with a span that has the highlight class
    return value.replace(pattern, (match) => {
      // Using Tailwind classes for highlighting (yellow background)
      // We need to ensure this HTML is rendered as innerHTML in the component
      return `<span class="bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 rounded px-0.5">${match}</span>`;
    });
  }
}
