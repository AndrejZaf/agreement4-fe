import { Link } from "react-router-dom";
import { ModifiedSnippet } from "./../types/ModifiedSnippet";

type SnippetNavigationProps = {
  onClickNext(): void;
  onClickBack(): void;
  snippetIndex: number;
  modifiedSnippets: ModifiedSnippet[];
  poppedSnippets: ModifiedSnippet[];
};

export default function SnippetNavigation({
  onClickBack,
  onClickNext,
  snippetIndex,
  modifiedSnippets,
  poppedSnippets,
}: SnippetNavigationProps) {
  return (
    <div className="snippet-nav-buttons mt-8 flex justify-between">
      <button
        className="btn gap-2"
        disabled={snippetIndex === 0}
        onClick={onClickBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </button>
      {/* <PlaceholderTracker modifiedSnippets={modifiedSnippets} /> */}
      {snippetIndex === modifiedSnippets.length ? (
        <Link
          to="/preview"
          state={{ data: poppedSnippets.concat(modifiedSnippets) }}
          className="btn gap-2">
          Preview
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      ) : (
        <button
          className="btn gap-2"
          onClick={onClickNext}
          disabled={snippetIndex === modifiedSnippets.length}>
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
