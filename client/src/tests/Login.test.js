import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../components/Login';
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe("Login testing", () => {
    test('Login Snapshot', () => {
        const component = renderer.create(<Login />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('checks that the labels are there', () => {
        const { getByText } = render(<Login />);
        getByText('Username:');
        getByText('Password:');
    });

    test('calls Log In button', () => {
        const handleClick = jest.fn();
        render(<Login />);
        fireEvent.click(screen.getByText('Log In', { selector: 'button' }));
        expect(handleClick).toHaveBeenCalledTimes(0)
    });

    test("with valid inputs", async () => {
        const handleClick = jest.fn();
        const { getByPlaceholderText, getByRole, getByText } = render(<Login />);
        const usernameLabel = getByPlaceholderText('Enter Username');
        const passwordLabel = getByPlaceholderText('Enter Password');      

        await act(async () => {
            fireEvent.change(usernameLabel, {target: {value: "isimbi"}});
            fireEvent.change(passwordLabel, {target: {value: "Anaick@123"}});
        })

        await act(async () => {
            fireEvent.click(getByText("Log In", { selector: 'button' }));
        })

        expect(usernameLabel.value).toBe("isimbi");
        expect(passwordLabel.value).toBe("Anaick@123");
        expect(handleClick).toHaveBeenCalledTimes(0);
    });

    test("with invalid username", () => {

    });

   test("with invalid password", () => {

    });

});