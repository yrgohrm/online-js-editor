

/**
 * A simple web component for displaying HTML and JavaScript.
 */
export class CodeView extends HTMLElement {
    private iframe: HTMLIFrameElement | null;

    constructor() {
        super();

        this.iframe = null;
    }

    connectedCallback() {
        // Create template
        const shadow = this.attachShadow({ mode: 'open' });

        this.iframe = document.createElement('iframe');

        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";

        shadow.appendChild(this.iframe);
    }

    disconnectedCallback() {
        this.iframe = null;
    }

    updateContent(content: string, type: string) {
        if (type === "text/html") {
            this.iframe?.contentDocument?.open();
            this.iframe?.contentDocument?.writeln(content);
            this.iframe?.contentDocument?.close();
        }
        else if (type === "text/javascript") {
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <title></title>
                </head>
                <body>
                    <script>
                        ${content}
                    </script>
                </body>
                </html>
            `;
            this.iframe?.contentDocument?.open();
            this.iframe?.contentDocument?.writeln(html);
            this.iframe?.contentDocument?.close();
        }
        else {
            throw new Error("Unknown mime type: " + type);
        }
    }
}

customElements.define('code-view', CodeView);