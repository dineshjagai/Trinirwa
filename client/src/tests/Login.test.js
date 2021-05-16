import React from 'react';
import Login from '../components/Login';
import { render } from '@testing-library/react'
//import { act } from 'react-dom/test-utils'


describe("Login testing", () => {
    test('checks that the Username is there', () => {
        const { getByLabelText } = render(<Login />);
        const username = getByLabelText('Username:');
        expect(username).toHaveAttribute('placeholder', 'Enter Username');
    });

    test('checks that the Password is there', () => {
        const { getByLabelText } = render(<Login />);
        const username = getByLabelText('Password:');
        expect(username).toHaveAttribute('type', 'password');
    });

    test("with valid inputs", async () => {
        // const { getByText } = render(<Login />);
        // const labelUsername = getByText('Username:');
        // const Password = getByText('Password:');
        // expect(labelUsername).
    //     const mockOnSubmit = jest.fn();
    //     const {getByLabelText, getByRole} = render(<Login />);

    //     await act(async () => {
    //         fireEvent.change(getByLabelText("Username:"), {target: {value: "isimbi"}});
    //         fireEvent.change(getByLabelText("Password:"), {target: {value: "Anaick@123"}});
    //     })

    //     await act(async () => {
    //         fireEvent.click(getByRole("button"));
    //     })

    //   expect(mockOnSubmit).toHaveBeenCalled();
    });

    test("with invalid username", () => {

    });

   test("with invalid password", () => {

    });

});