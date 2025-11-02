import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './Filter';
import { LevelButton } from '../common/LevelButton';

// Mock the LevelButton to simplify testing
jest.mock('../common/LevelButton', () => ({
    LevelButton: jest.fn(({ level, onClick }) => (
        <button data-testid={`level-button-${level}`} onClick={onClick}>
            Level {level}
        </button>
    )),
}));

describe('FilterBar', () => {
    const mockOnToggleFilters = jest.fn();
    const mockOnLevelToggle = jest.fn();
    const mockOnClearLevels = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset mock implementation before each test
        LevelButton.mockImplementation(({ level, onClick }) => (
            <button data-testid={`level-button-${level}`} onClick={onClick}>
                Level {level}
            </button>
        ));
    });

    test('renders correctly when filters are hidden and no levels are selected', () => {
        render(
            <FilterBar
                showFilters={false}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set()}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        expect(screen.getByText('FILTER BY LEVEL')).toBeInTheDocument();
        expect(screen.getByLabelText('Toggle filters')).toBeInTheDocument();
        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
        expect(screen.queryByText(/Level \d+/)).not.toBeInTheDocument();
    });

    test('renders correctly when filters are hidden and a single level is selected', () => {
        render(
            <FilterBar
                showFilters={false}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set([5])}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('renders correctly when filters are hidden and multiple levels are selected', () => {
        render(
            <FilterBar
                showFilters={false}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set([3, 8])}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        expect(screen.getByText('3 - 8')).toBeInTheDocument();
    });

    test('renders correctly when filters are shown', () => {
        render(
            <FilterBar
                showFilters={true}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set()}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        expect(screen.getByText('HIDE FILTER')).toBeInTheDocument();
        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
        expect(screen.getAllByText(/Level \d+/).length).toBe(15);
    });

    test('shows "Clear All" button when filters are shown and levels are selected', () => {
        render(
            <FilterBar
                showFilters={true}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set([1])}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        expect(screen.getByText('Clear All')).toBeInTheDocument();
    });

    test('calls onToggleFilters when the toggle button is clicked', () => {
        render(
            <FilterBar
                showFilters={false}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set()}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        userEvent.click(screen.getByLabelText('Toggle filters'));
        expect(mockOnToggleFilters).toHaveBeenCalledTimes(1);
    });

    test('calls onLevelToggle when a level button is clicked', () => {
        render(
            <FilterBar
                showFilters={true}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set()}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        userEvent.click(screen.getByTestId('level-button-5'));
        expect(mockOnLevelToggle).toHaveBeenCalledWith(5);
        expect(mockOnLevelToggle).toHaveBeenCalledTimes(1);
    });

    test('calls onClearLevels when "Clear All" button is clicked', () => {
        render(
            <FilterBar
                showFilters={true}
                onToggleFilters={mockOnToggleFilters}
                selectedLevels={new Set([1, 2])}
                onLevelToggle={mockOnLevelToggle}
                onClearLevels={mockOnClearLevels}
            />
        );

        userEvent.click(screen.getByText('Clear All'));
        expect(mockOnClearLevels).toHaveBeenCalledTimes(1);
    });
});