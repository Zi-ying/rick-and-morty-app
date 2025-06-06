import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Navigation from '../navigation/navigation';

// Mock the SVG import
jest.mock('@/assets/rick-and-morty.svg', () => 'mocked-svg-path');

// Mock the UI components
jest.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="navigation-menu">{children}</div>,
  NavigationMenuContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="navigation-menu-content" className={className}>{children}</div>
  ),
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="navigation-menu-item">{children}</div>
  ),
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="navigation-menu-list">{children}</div>
  ),
  NavigationMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="navigation-menu-trigger">{children}</div>
  ),
}));

// Mock the cn utility function
jest.mock('@/lib/utils', () => ({
  cn: (...inputs: string[]) => inputs.join(' '),
}));

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Navigation', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the logo', () => {
    renderWithRouter(<Navigation />);
    const logo = screen.getByAltText('Rick and Morty');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-svg-path');
  });

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Characters').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Locations').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Episodes').length).toBeGreaterThan(0);
  });

  it('applies active styles to the current route', () => {
    renderWithRouter(<Navigation />, { route: '/character' });
    const characterLinks = screen.getAllByText('Characters');
    // Check if any of the links has the underline class applied
    const hasUnderline = characterLinks.some(link =>
      link.closest('a')?.className.includes('underline')
    );
    expect(hasUnderline).toBe(true);
  });

  it('renders mobile menu on small screens', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-menu-trigger')).toBeInTheDocument();
  });
});
