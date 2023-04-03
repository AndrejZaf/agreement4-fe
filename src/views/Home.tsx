import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.scss";
import { ModifiedSnippet } from "./../types/ModifiedSnippet";
import { insertAtIndex } from "../utils/StringUtils";
import UploadFile from "../components/UploadFile";
import SnippetNavigation from "../components/SnippetNavigation";
import SnippetContainer from "../components/SnippetContainer";
import { SnippetDTO } from "../types/SnippetDTO";
const UploadFileSchema = yup.object({
  file: yup.mixed().required("File is required"),
});

const UploadFileSchemaResolver = yupResolver(UploadFileSchema, {
  abortEarly: false,
});

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<File>();
  const [modifiedSnippets, setModifiedSnippets] = useState<ModifiedSnippet[]>(
    []
  );
  const [poppedSnippets, setPoppedSnippets] = useState<ModifiedSnippet[]>([]);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: UploadFileSchemaResolver });

  useEffect(() => {}, [modifiedSnippets, snippetIndex]);

  const onFileUpload = (el: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDoc(el.target.files![0]);
    let formData = new FormData();
    formData.append("file", el.target.files![0]);
    axios
      .post("http://localhost:8080/api/file", formData)
      .then((response) => {
        prepareSnippets(response.data);
      })
      .catch((err: any) => console.log(err));
  };

  const prepareSnippets = (snippets: SnippetDTO[]) => {
    const modSnipps: ModifiedSnippet[] = [];
    snippets.forEach((snippetDTO: SnippetDTO) => {
      const regex = /\[[^\]]*\]/g;
      const matches: RegExpMatchArray[] = [
        ...snippetDTO.snippet.matchAll(regex),
      ];
      let modifiedSnippet: ModifiedSnippet = {
        id: snippetDTO.id,
        snippet: snippetDTO.snippet,
        positions: [],
      };
      // matches.reverse().forEach((match) => {
      matches.forEach((match) => {
        const startPosition = match.index;
        const endPosition = match.index! + match[0].length;
        // Find an alternative solution to this problem
        // const placeholderText = `<span id="placeholder" data-start=${startPosition} data-end=${endPosition}>${match[0]}</span>`;
        const placeholderText = match[0];
        modifiedSnippet.positions.push({
          oldStartPosition: startPosition!,
          oldEndPosition: endPosition,
          oldPlaceholder: placeholderText,
        });
        snippetDTO.snippet = insertAtIndex(
          snippetDTO.snippet,
          placeholderText,
          startPosition!,
          endPosition
        );
        modifiedSnippet.snippet = snippetDTO.snippet;
      });
      modSnipps.push(modifiedSnippet);
    });
    setModifiedSnippets(modSnipps);
  };

  const onClickNext = () => {
    poppedSnippets.push(modifiedSnippets.shift()!);
    setModifiedSnippets(modifiedSnippets);
    setPoppedSnippets(poppedSnippets);
    setSnippetIndex(snippetIndex + 1);
  };

  const onClickBack = () => {
    modifiedSnippets.unshift(poppedSnippets.pop()!);
    setPoppedSnippets(poppedSnippets);
    setModifiedSnippets(modifiedSnippets);
    setSnippetIndex(snippetIndex - 1);
  };

  return (
    <div className="home-page w-full h-screen flex items-center justify-center">
      <div className="center-content w-[30%] text-center">
        <UploadFile onFileUpload={onFileUpload} />
        {modifiedSnippets?.length !== 0 && (
          <>
            <SnippetContainer
              modifiedSnippets={modifiedSnippets}
              snippetIndex={snippetIndex}
              setModifiedSnippets={setModifiedSnippets}
            />
            <SnippetNavigation
              selectedDoc={selectedDoc}
              poppedSnippets={poppedSnippets}
              modifiedSnippets={modifiedSnippets}
              snippetIndex={snippetIndex}
              onClickBack={onClickBack}
              onClickNext={onClickNext}
            />
          </>
        )}
      </div>
    </div>
  );
}
