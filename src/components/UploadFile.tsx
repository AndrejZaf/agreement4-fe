import React from "react";

type UploadFileProps = {
  onFileUpload(el: React.ChangeEvent<HTMLInputElement>): void;
};

export default function UploadFile({ onFileUpload }: UploadFileProps) {
  return (
    <div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        accept="application/msword"
        onChange={onFileUpload}
      />
    </div>
  );
}
