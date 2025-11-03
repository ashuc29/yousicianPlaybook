import { getLevelColors } from '../../utils/colorUtils';
import './LevelIndicator.css';

export const LevelIndicator = ({ level, maxLevel = 15, size = 32, strokeWidth = 2 }) => {
    const { color } = getLevelColors(level);
    const svgSize = size;
    const radius = (svgSize / 2) - (strokeWidth / 2);
    const circumference = radius * 2 * Math.PI;
    const offset = circumference * (1 - (level / maxLevel));

    return (
        <div
            className="level-indicator-container"
            style={{ '--size': `${size}px`, '--level-color': color }}
        >
            <span className="level-indicator-number">{level}</span>

            <svg
                className="level-indicator-svg"
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
            >
                <circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    className="level-indicator-track"
                />
                <circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="level-indicator-arc"
                />
            </svg>
        </div>
    );
};