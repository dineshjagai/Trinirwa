import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../components/Registration';
import { render, screen, fireEvent } from '@testing-library/react'
//import { act } from 'react-dom/test-utils'


describe("Registration testing", () => {
    test('Registration Snapshot', () => {
        const component = renderer.create(<Registration />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('checks that the labels are there', () => {
        const { getByText } = render(<Registration />);
        getByText('Username:');
        getByText('Email address');
        getByText('First Name:');
        getByText('Password:');
        getByText('Last Name:');
        getByText('Confirm Password:');
    });


    test('calls Sign Up button', () => {
        const handleClick = jest.fn();
        render(<Registration />);
        fireEvent.click(screen.getByText('Sign Up', { selector: 'button' }));
        expect(handleClick).toHaveBeenCalledTimes(0)
    });


    test("with valid inputs", async () => {
        // const { getByText } = render(<Registration />);
        // const labelUsername = getByText('Username:');
        // const Password = getByText('Password:');
        // expect(labelUsername).
    //     const mockOnSubmit = jest.fn();
    //     const {getByLabelText, getByRole} = render(<Registration />);

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