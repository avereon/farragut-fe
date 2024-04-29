import React, {act} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

jest.mock("usehooks-ts", () => ({
    useLocalStorage: () => ([false, jest.fn(), jest.fn()])
}));

const queryClient = new QueryClient();
test('Login button enabled and disables correctly', () => {
    act(() => {
        render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>);
    })

    const usernameInput = screen.getByPlaceholderText(/username/i)
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole("button", {name: /login/i});
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    act(() => {
        usernameInput.focus();
        fireEvent.change(usernameInput, {target: {value: "test"}});

        passwordInput.focus();
        fireEvent.change(passwordInput, {target: {value: "test"}});
    });
    expect(loginButton).toBeEnabled();

    act(() => {
        usernameInput.focus();
        fireEvent.change(usernameInput, {target: {value: ""}});

        passwordInput.focus();
        fireEvent.change(passwordInput, {target: {value: ""}});
    });
    expect(loginButton).toBeDisabled();
});
