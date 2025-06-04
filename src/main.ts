import { CodeEditor } from './codeeditor';
import { CodeView } from './codeview';

const runButton = document.getElementById("run");
runButton?.addEventListener("click", () => {
  const editor = document.getElementById("editor") as CodeEditor;
  const view = document.getElementById("view") as CodeView;
  const lang = document.getElementById("editor-lang") as HTMLSelectElement;

  view.updateContent(editor.getDocument(), lang.value);
});

const langSelect = document.getElementById("editor-lang");
langSelect?.addEventListener("change", () => {
  const editor = document.getElementById("editor") as CodeEditor;
  const lang = document.getElementById("editor-lang") as HTMLSelectElement;

  editor.setLanguage(lang.value);
})