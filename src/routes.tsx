import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import PreviewSnippets from "./views/PreviewSnippets";

export default function RouterModule() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/preview" element={<PreviewSnippets />}></Route>
    </Routes>
  );
}
