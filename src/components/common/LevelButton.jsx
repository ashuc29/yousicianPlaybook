import { LevelIndicator } from './LevelIndicator';
import './LevelButton.css';

/**
 * Level Filter Button Component
 */
export const LevelButton = ({ level, isActive, onClick }) => {
    const buttonClasses = `level-button ${isActive ? 'level-button--active' : 'level-button--inactive group'}`;

    return (
        <button
            onClick={onClick}
            className={buttonClasses}
            aria-label={`Filter by level ${level}`}
            aria-pressed={isActive}
        >
            {isActive ? level : <LevelIndicator level={level} size={44} strokeWidth={3} />}
        </button>
    );
};