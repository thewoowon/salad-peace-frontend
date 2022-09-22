import { render, waitFor } from "@testing-library/react";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";


jest.mock("../../router/logged-out-router.tsx",()=>{
    return {
        LoggedOutRouter:() => <span>logged-out</span>
    };
});

jest.mock("../../router/logged-in-router.tsx",()=>{
    return {
        LoggedInRouter:() => <span>logged-in</span>
    };
});

describe("<App />", ()=>{
    it("renders LoggedOutRouter",() => {
        const { getByText } = render(<App />);
        getByText("logged-out");
    });
    it("renders LoggedInRouter", async () => {
        await waitFor(() => {
            isLoggedInVar(true);
          });
        const { getByText } = render(<App />);
        getByText("logged-in");
    });
})