import { CustomElement } from "../custom-element";

const template=require("./my-btn.html");
const styles=require("./my-btn.scss");

@CustomElement(
    {
        selector:'my-btn',
        template:template.default,
    }
)
export class MyBtn extends HTMLElement{
    /**
     *
     */
    constructor() {
        super();
    }
}
