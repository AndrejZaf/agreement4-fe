export interface ModifiedSnippet {
  snippet: string;
  positions: PlaceholderLocation[];
}

export interface PlaceholderLocation {
  oldStartPosition: number;
  oldEndPosition: number;
  oldPlaceholder?: string;
  newStartPosition?: number;
  newEndPosition?: number;
  newPlaceholder?: string;
}
