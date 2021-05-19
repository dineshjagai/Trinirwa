import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../components/Login';
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';


describe("Login testing", () => {
    test('Login Snapshot', () => {
        const component = renderer.create(<Login />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('checks that the labels are there', () => {
        const { getByText } = render(<Login />);
        expect(screen.getByText('Username:')).toBeInTheDocument();
        expect(screen.getByText('Password:')).toBeInTheDocument();
    });

    test('calls Log In button', () => {
        // const handleClick = jest.fn();
        const { getByText } = render(<Login />);
        fireEvent.click(screen.getByText('Log In', { selector: 'button' }));
        // expect(handleClick).toHaveBeenCalledTimes(0)
    });

    test("with valid inputs", async () => {
        const { getByPlaceholderText, getByRole, getByText } = render(<Login />);
        const usernameLabel = getByPlaceholderText('Enter Username');
        const passwordLabel = getByPlaceholderText('Enter Password');  
        const btn = screen.getByText('Log In', { selector: 'button' });
        expect(btn).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(usernameLabel, {target: {value: "isimbi"}});
            fireEvent.change(passwordLabel, {target: {value: "Anaick@123"}});
        });

        expect(usernameLabel.value).toBe("isimbi");
        expect(passwordLabel.value).toBe("Anaick@123");

        await act(async () => {
            await fireEvent.click(btn); 
        });
    });


    test("test login buttons", async () => {
        const { getByText } = render(<Login />);
        expect(screen.getByText('Click here to reset!').closest('a')).toBeInTheDocument();
    });

});