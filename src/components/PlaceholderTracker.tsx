import { ModifiedSnippet } from "./../types/ModifiedSnippet";
import { useEffect } from "react";

type PlaceholderTrackerProps = {
  modifiedSnippets: ModifiedSnippet[];
};

export default function PlaceholderTracker({
  modifiedSnippets,
}: PlaceholderTrackerProps) {
  useEffect(() => {
    console.log(modifiedSnippets);
  }, [modifiedSnippets]);
  const tracker = () => {
    return modifiedSnippets[0].positions.filter(
      (pos) => !pos.newPlaceholder && pos.newPlaceholder !== pos.oldPlaceholder
    ).length;
  };

  return (
    <div className="flex items-center">{tracker()} elements remaining</div>
  );
}
