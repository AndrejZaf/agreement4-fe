import { toSentenceCase } from "../utils/StringUtils";
import { ModifiedSnippet } from "../types/ModifiedSnippet";
import ContentEditable from "react-contenteditable";

type SnippetContainerProps = {
  modifiedSnippets: ModifiedSnippet[];
  snippetIndex: number;
  setModifiedSnippets: React.Dispatch<React.SetStateAction<ModifiedSnippet[]>>;
};

export default function SnippetContainer({
  modifiedSnippets,
  snippetIndex,
  setModifiedSnippets,
}: SnippetContainerProps) {
  const handleInput = (el: any, keyIndex: number) => {
    const currentSnippet = modifiedSnippets[0];
    const changedElement = currentSnippet.positions[keyIndex];
    changedElement.newPlaceholder = el.target.value;
    setModifiedSnippets(modifiedSnippets);
  };

  const wrapTags = (modSnippet: ModifiedSnippet) => {
    const regex = /(\s|\[[^\]]*\])/g;
    const matchCurlyBrackets = /\[[^\]]*\]/g;
    const textArray = modSnippet.snippet.split(regex);
    let keyIndex = 0;
    return textArray.map((str, index) => {
      if (matchCurlyBrackets.test(str)) {
        const tooltipMessage = toSentenceCase(str.slice(1, str.length - 1));
        const changedIndex = keyIndex;
        const newPlaceholder =
          modSnippet.positions[changedIndex].newPlaceholder;
        keyIndex++;
        return (
          <ContentEditable
            className="tooltip bg-blue-200 border focus:outline-none focus:border-[#313643] focus:ring-[#313643] focus:ring-1 rounded-md"
            data-tip={tooltipMessage}
            key={index}
            html={newPlaceholder ?? str}
            onChange={(el) => handleInput(el, changedIndex)}
          />
        );
      }
      return str;
    });
  };

  return (
    <div className="stack mt-5 w-full">
      <div className="card shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Snippet {snippetIndex + 1}</h2>
          <div className="text-justify text-xl">
            {wrapTags(modifiedSnippets[0])}
          </div>
        </div>
      </div>
      {modifiedSnippets
        .slice(0, modifiedSnippets.length - 1)
        .map((_, index) => (
          <div className="card shadow-lg bg-base-100" key={index}>
            <div className="card-body">
              <h2 className="card-title">Snippet {index + 1}</h2>"
            </div>
          </div>
        ))}
    </div>
  );
}
