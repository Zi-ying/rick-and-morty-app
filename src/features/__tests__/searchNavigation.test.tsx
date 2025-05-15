import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchNavigation from '../searchNavigation';

describe('SearchNavigation', () => {
  const defaultProps = {
    placeholder: 'Search...',
    value: '',
    toggled: false,
    onChange: jest.fn(),
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all required props', () => {
    render(<SearchNavigation {...defaultProps} />);

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    // Check if heart toggle is rendered
    const heartToggle = screen.getByRole('button');
    expect(heartToggle).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    render(<SearchNavigation {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'test');

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should call onToggle when heart button is clicked', () => {
    const onToggle = jest.fn();
    const onChange = jest.fn();
    render(
      <SearchNavigation
        placeholder="Search..."
        value=""
        toggled={false}
        onChange={onChange}
        onToggle={onToggle}
      />
    );

    const heartButton = screen.getByTestId('heart-toggle');
    fireEvent.click(heartButton);

    expect(onToggle).toHaveBeenCalled();
  });

  it('renders children when provided', () => {
    const testChild = <div data-testid="test-child">Test Child</div>;
    render(<SearchNavigation {...defaultProps}>{testChild}</SearchNavigation>);

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });

  it('displays the correct value in the input', () => {
    const testValue = 'test value';
    render(<SearchNavigation {...defaultProps} value={testValue} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveValue(testValue);
  });
});
