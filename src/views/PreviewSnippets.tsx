import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModifiedSnippet } from "./../types/ModifiedSnippet";
import ContentEditable from "react-contenteditable";
import { toSentenceCase } from "../utils/StringUtils";

type PreviewSnippetsProps = {};

export default function PreviewSnippets({}: PreviewSnippetsProps) {
  const location = useLocation();
  const [modifiedSnippets, setModifiedSnippets] = useState<ModifiedSnippet[]>();
  useEffect(() => {
    const data = location.state?.data;
    setModifiedSnippets(data);
  }, [location.state.data]);

  const handleInput = (
    el: any,
    keyIndex: number,
    modifiedSnippet: ModifiedSnippet
  ) => {
    const currentSnippet = modifiedSnippet;
    const changedElement = currentSnippet.positions[keyIndex];
    changedElement.newPlaceholder = el.target.value;
    setModifiedSnippets(modifiedSnippets);
  };

  const onSubmit = () => {};

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
            onChange={(el) => handleInput(el, changedIndex, modSnippet)}
          />
        );
      }
      return str;
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[60%] cards">
        {modifiedSnippets
          ? modifiedSnippets.map((modSnippet, index) => (
              <div className="card shadow-lg bg-base-100 mt-4" key={index}>
                <div className="card-body">
                  <h2 className="card-title">Snippet {index + 1}</h2>
                  <div className="text-justify text-xl">
                    {wrapTags(modSnippet)}
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <div className="mt-8">
        <button className="btn gap-2" onClick={onSubmit}>
          Submit
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
