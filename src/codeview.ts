

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
        if (this.iframe == null) {
            throw new Error("no iframe available");
        }

        const loader = () => {
            this.iframe?.removeEventListener("load", loader);

            this.iframe?.contentDocument?.open();

            this.iframe?.contentWindow?.addEventListener("error", (error) => {
                console.log(error);
                alert(error.message);
            });

            const data = this.contentByMime(content, type);
            this.iframe?.contentDocument?.writeln(data);
            this.iframe?.contentDocument?.close();
        };

        this.iframe.src = "about:blank";
        this.iframe.addEventListener("load", loader);
    }

    contentByMime(content: string, type: string): string {
        if (type === "text/html") {
            return content;
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

            return html;
        }
        else {
            throw new Error("Unknown mime type: " + type);
        }
    }
}

customElements.define('code-view', CodeView);