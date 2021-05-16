import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../components/Registration';
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'


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
        const { getByPlaceholderText, getByRole } = render(<Registration/>);
        const usernameLabel = getByPlaceholderText('Enter Username');
        const emailLabel = getByPlaceholderText('Enter email');
        const firstnameLabel = getByPlaceholderText('Enter First Name');
        const lastnameLabel = getByPlaceholderText('Enter Last Name');   
        const passwordLabel = getByPlaceholderText('Enter Password');
        const confirmLabel = getByPlaceholderText('Re-Enter Password');
        const mockOnSubmit = jest.fn();

        await act(async () => {
            fireEvent.change(usernameLabel, {target: {value: "isimbib"}});
            fireEvent.change(emailLabel, {target: {value: "isimbi@gmail.com"}});
            fireEvent.change(firstnameLabel, {target: {value: "isimbi"}});
            fireEvent.change(lastnameLabel, {target: {value: "Bizi"}});
            fireEvent.change(passwordLabel, {target: {value: "Anaick@123"}});
            fireEvent.change(confirmLabel, {target: {value: "Anaick@123"}});
        })

        await act(async () => {
            fireEvent.click(getByRole("button"));
        })

      expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });
    test("with invalid username", () => {

    });

   test("with invalid password", () => {

    });

});