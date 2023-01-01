export interface CustomElementConfig {
    selector: string,
    template:string,
    useShadow?: boolean
}

export function CustomElement<T extends HTMLElement>(config: CustomElementConfig) {
    return (cls:
        {
            new(...params: any[]): T,
        }) => {
        const template = document.createElement("template");
        const connectedCallback= cls.prototype.connectedCallback || function () { };
        cls.prototype.connectedCallback = function () {
            template.innerHTML = config.template;
            const clone = template.content.cloneNode(true);

            if (config.useShadow) {
                this.attachShadow({ mode: 'open' }).appendChild(clone);
            } else {
                this.appendChild(clone)
            }
            connectedCallback(this);
        }
        if (!window.customElements.get(config.selector)) {
            window.customElements.define(config.selector, cls)
        }
    };
}

