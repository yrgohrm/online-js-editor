import { EditorView, basicSetup } from "codemirror"
import {StateEffect} from "@codemirror/state"
import { html } from "@codemirror/lang-html"
import { javascript } from "@codemirror/lang-javascript"
import { baseHtml, baseJavaScript } from "./basecode"

/**
 * A simple web component wrapping the CodeMirror editor
 */
export class CodeEditor extends HTMLElement {
    private editor: EditorView | null;

    constructor() {
        super();

        this.editor = null;
    }

    connectedCallback() {
        // Create template
        const shadow = this.attachShadow({ mode: 'open' });

        const stylesheet = document.createElement('style');
        stylesheet.textContent = `
            .cm-editor {
                height: 100%;
            }
        `;

        const parent = document.createElement('div');

        parent.style.width = "100%";
        parent.style.height = "100%";

        shadow.appendChild(stylesheet);
        shadow.appendChild(parent);

        this.editor = new EditorView({
            doc: baseHtml,
            parent: parent,
            extensions: [
                basicSetup,
                html()
            ]
        });
    }

    disconnectedCallback() {
        this.editor?.destroy()
        this.editor = null
    }

    getDocument(): string {
        return this?.editor?.state.doc.toString() ?? "";
    }

    setLanguage(language: string) {
        const currentDocument = this.getDocument();
        if (language === "text/html") {
            if (currentDocument.length === 0 ||
                currentDocument === baseJavaScript) {
                this.setDocument(baseHtml);
            }

            this.editor?.dispatch({
                effects: StateEffect.reconfigure.of([basicSetup, html()])
            });
        }
        else if (language === "text/javascript") {
            if (currentDocument.length === 0 ||
                currentDocument  === baseHtml) {
                this.setDocument(baseJavaScript);
            }

            this.editor?.dispatch({
                effects: StateEffect.reconfigure.of([basicSetup, javascript()])
            });
        }
        else {
            throw new Error("Unknown mime type: " + language);
        }
    }

    private setDocument(text: string) {
        this.editor?.dispatch({
            changes: { from: 0, to: this.editor?.state.doc.length, insert: text }
        });
    }
}

customElements.define('code-editor', CodeEditor);