import React from 'react'
import ManageUserMenu from '../ManageUserMenu';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

// Mock the Image component from next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock the DeleteConfirmModal component
jest.mock("../modals/DeleteConfirmModal", () => ({
  __esModule: true,
  default: ({ user }: any) => <div>DeleteConfirmModal for {user?._id}</div>,
}));

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ManageUserMenu() ManageUserMenu method', () => {
  // Happy path test: Ensure the component renders correctly with a valid user
  it('should render the ManageUserMenu with a valid user', () => {
    const user = { _id: '123' };
    render(<ManageUserMenu user={user} />);

    expect(screen.getByAltText('edit')).toBeInTheDocument();
    expect(screen.getByText('DeleteConfirmModal for 123')).toBeInTheDocument();
  });

  // Happy path test: Ensure clicking the edit image navigates to the correct URL
  it('should navigate to the correct URL when the edit image is clicked', () => {
    const user = { _id: '123' };
    render(<ManageUserMenu user={user} />);

    const editImage = screen.getByAltText('edit');
    fireEvent.click(editImage);

    expect(mockPush).toHaveBeenCalledWith('/manage-user/123');
  });

  // Edge case test: Ensure the component handles a missing user gracefully
  it('should handle a missing user gracefully', () => {
    render(<ManageUserMenu user={null} />);

    expect(screen.getByAltText('edit')).toBeInTheDocument();
    expect(screen.getByText('DeleteConfirmModal for')).toBeInTheDocument();
  });

  // Edge case test: Ensure the component handles an undefined user gracefully
  it('should handle an undefined user gracefully', () => {
    render(<ManageUserMenu user={undefined} />);

    expect(screen.getByAltText('edit')).toBeInTheDocument();
    expect(screen.getByText('DeleteConfirmModal for')).toBeInTheDocument();
  });
});