import { fireEvent, render, screen } from '@testing-library/react';

import CharacterCard from '../characters/characterCard';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard', () => {
  const mockOnClick = jest.fn();
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    render(
      <CharacterCard
        data={mockCharacter}
        isPending={true}
        isFavorite={false}
        onClick={mockOnClick}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders character information correctly', () => {
    render(
      <CharacterCard
        data={mockCharacter}
        isPending={false}
        isFavorite={false}
        onClick={mockOnClick}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(
      <CharacterCard
        data={mockCharacter}
        isPending={false}
        isFavorite={false}
        onClick={mockOnClick}
        onToggle={mockOnToggle}
      />
    );

    fireEvent.click(screen.getByRole('article'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when heart is clicked', () => {
    render(
      <CharacterCard
        data={mockCharacter}
        isPending={false}
        isFavorite={false}
        onClick={mockOnClick}
        onToggle={mockOnToggle}
      />
    );

    const heartButton = screen.getByRole('button');
    fireEvent.click(heartButton);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
