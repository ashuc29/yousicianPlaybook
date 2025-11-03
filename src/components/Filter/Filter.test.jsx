import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './Filter';
import { LevelFilterButton } from '../common/LevelFilterButton';

jest.mock('../common/LevelFilterButton', () => ({
    LevelFilterButton: jest.fn(({ level, onClick }) => (
        <button data-testid={`level-button-${level}`} onClick={onClick}>
            Level {level}
        </button>
    )),
}));

describe('FilterBar', () => {
    const mockOnToggleFilters = jest.fn();
    const mockOnLevelToggle = jest.fn();
    const mockOnClearLevels = jest.fn();

    const renderFilterBar = (props = {}) => {
        const defaultProps = {
            showFilters: false,
            onToggleFilters: mockOnToggleFilters,
            selectedLevels: new Set(),
            onLevelToggle: mockOnLevelToggle,
            onClearLevels: mockOnClearLevels,
        };
        return render(<FilterBar {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset mock implementation before each test
        LevelFilterButton.mockImplementation(({ level, onClick }) => (
            <button data-testid={`level-button-${level}`} onClick={onClick}>
                Level {level}
            </button>
        ));
    });

    test('renders correctly when filters are hidden and no levels are selected', () => {
        renderFilterBar();

        expect(screen.getByText('FILTER BY LEVEL')).toBeInTheDocument();
        expect(screen.getByLabelText('Toggle filters')).toBeInTheDocument();
        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
        expect(screen.queryByText(/Level \d+/)).not.toBeInTheDocument();
    });

    test('renders correctly when filters are hidden and a single level is selected', () => {
        renderFilterBar({ selectedLevels: new Set([5]) });
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('renders correctly when filters are hidden and multiple levels are selected', () => {
        renderFilterBar({ selectedLevels: new Set([3, 8]) });
        expect(screen.getByText('3 - 8')).toBeInTheDocument();
    });

    test('renders correctly when filters are shown', () => {
        renderFilterBar({ showFilters: true });

        expect(screen.getByText('HIDE FILTER')).toBeInTheDocument();
        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
        expect(screen.getAllByText(/Level \d+/).length).toBe(15);
    });

    test('shows "Clear All" button when filters are shown and levels are selected', () => {
        renderFilterBar({ showFilters: true, selectedLevels: new Set([1]) });
        expect(screen.getByText('Clear All')).toBeInTheDocument();
    });

    test('calls onToggleFilters when the toggle button is clicked', () => {
        renderFilterBar();
        userEvent.click(screen.getByLabelText('Toggle filters'));
        expect(mockOnToggleFilters).toHaveBeenCalledTimes(1);
    });

    test('calls onLevelToggle when a level button is clicked', () => {
        renderFilterBar({ showFilters: true });
        userEvent.click(screen.getByTestId('level-button-5'));
        expect(mockOnLevelToggle).toHaveBeenCalledWith(5);
        expect(mockOnLevelToggle).toHaveBeenCalledTimes(1);
    });

    test('calls onClearLevels when "Clear All" button is clicked', () => {
        renderFilterBar({ showFilters: true, selectedLevels: new Set([1, 2]) });
        userEvent.click(screen.getByText('Clear All'));
        expect(mockOnClearLevels).toHaveBeenCalledTimes(1);
    });
});