import { LevelButton } from '../common/LevelButton';
import '../../styles/variable.css';
import './Filter.css';

export const FilterBar = ({ showFilters, onToggleFilters, selectedLevels, onLevelToggle }) => {
    const levels = Array.from({ length: 15 }, (_, i) => i + 1);
    let rangeText = null;
    if (selectedLevels.size > 0) {
        const minLevel = Math.min(...selectedLevels);
        const maxLevel = Math.max(...selectedLevels);
        rangeText = minLevel === maxLevel ? `${minLevel}` : `${minLevel} - ${maxLevel}`;
    }
    return (
        <div className="filter-bar">
            <div className="filter-container">
                <div className="filter-toggle-container">
                    <span className={`filter-label ${!showFilters ? 'label-closed' : ''}`}>
                        {showFilters ? 'HIDE FILTER' : 'FILTER BY LEVEL'}
                    </span>
                    {!showFilters && rangeText ? (
                        <button
                            onClick={onToggleFilters}
                            aria-label="Toggle filters"
                            className="filter-button-range"
                        >
                            <span className="range-text">{rangeText}</span>
                            <span className="filter-icon-wrapper">
                                <span className="filter-icon"></span>
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={onToggleFilters}
                            aria-label="Toggle filters"
                            className="filter-button"
                        >
                            <span className="filter-icon invert"></span>
                        </button>
                    )}
                </div>
                {showFilters && (
                    <div className="levels-container">
                        {levels.map((level) => (
                            <LevelButton
                                key={level}
                                level={level}
                                isActive={selectedLevels.has(level)}
                                onClick={() => onLevelToggle(level)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};