import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { SongSearch } from './SongSearch';

describe('SongSearch', () => {
    it('renders the search banner with title, subtitle, and search input', () => {
        render(<SongSearch onSearchChange={() => { }} />);

        expect(screen.getByText('NEW SONGS DELIVERED EVERY WEEK')).toBeInTheDocument();
        expect(screen.getByText('Here are the most recent additions to the Yousician App. Start playing today!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search for songs...')).toBeInTheDocument();
    });

    it('calls onSearchChange with the input value when text is entered', () => {
        const handleSearchChange = jest.fn();
        render(<SongSearch onSearchChange={handleSearchChange} />);

        const searchInput = screen.getByPlaceholderText('Search for songs...');
        fireEvent.change(searchInput, { target: { value: 'test query' } });

        expect(searchInput.value).toBe('test query');
        expect(handleSearchChange).toHaveBeenCalledTimes(1);
        expect(handleSearchChange).toHaveBeenCalledWith('test query');
    });

    it('updates input value as user types', () => {
        const handleSearchChange = jest.fn();
        render(<SongSearch onSearchChange={handleSearchChange} />);

        const searchInput = screen.getByPlaceholderText('Search for songs...');

        fireEvent.change(searchInput, { target: { value: 'hello' } });
        expect(searchInput.value).toBe('hello');

        fireEvent.change(searchInput, { target: { value: 'hello world' } });
        expect(searchInput.value).toBe('hello world');
        expect(handleSearchChange).toHaveBeenCalledWith('hello world');
    });
});