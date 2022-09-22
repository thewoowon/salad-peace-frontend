import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { act } from "react-dom/test-utils";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Login, LOGIN_MUTATION } from "../login";

describe("<Login />",()=>{
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async ()=>{
    await waitFor(()=>{
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <BrowserRouter>
            <ApolloProvider client={mockedClient}>
              <Login></Login>
            </ApolloProvider>
          </BrowserRouter>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Uber Eats");
    });
  });
  it("displays email validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    let errorMessage;
    const email = getByPlaceholderText(/Email/i);
    act(()=>{
      userEvent.type(email, "this@wont");
      waitFor(()=>{
        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
      })
    })
    act(() => {
      userEvent.clear(email);
      waitFor(()=>{
        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/Email is required/i);
      })
    });
  });

  it("display password required errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/Email/i);
    const submitBtn = getByRole("button");
    act(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
      waitFor(()=>{
        const errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/Password is required/i);
      })
    });
  });
  
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    act(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
      waitFor(()=>{
        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
          loginInput: {
            email: formData.email,
            password: formData.password,
          },
        });
        const errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/mutation-error/i);
        expect(localStorage.setItem).toHaveBeenCalledWith("uber-token", "XXX");
      })
    });
  });
})