import React, {act} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useLocalStorage} from "usehooks-ts";

jest.mock("usehooks-ts", () => ({
    useLocalStorage: jest.fn()
}));

const mockedLocalStorage = useLocalStorage as jest.Mock;

const queryClient = new QueryClient();

const renderApp = () => {
    return render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>);
}

it('Login button enables and disables correctly', () => {
    mockedLocalStorage.mockReturnValue([false, jest.fn(), jest.fn()]);
    renderApp();

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

it("should hide login card when authenticated", async () => {
    mockedLocalStorage.mockReturnValue([true, jest.fn(), jest.fn()]);
    renderApp();
    expect(screen.queryByPlaceholderText(/username/i)).not.toBeInTheDocument();
});
