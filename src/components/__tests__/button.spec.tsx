import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button></Button>",()=>{
    it("should render OK with props",()=>{
        const {getByText} = render(
            <Button canClick={true} loading={false} actionText={"test"}></Button>
        );
        getByText("test");
    });

    it("should display loading",()=>{
        const {getByText,container} = render(
            <Button canClick={false} loading={true} actionText={"test"}></Button>
        );
        getByText("Loading...");
        expect(container.firstChild).toHaveClass("pointer-events-none");
    });
});