import { getLevelColors } from '../../utils/colorUtils';
import './LevelIndicator.css';

export const LevelIndicator = ({ level, maxLevel = 15, size = 32, strokeWidth = 2 }) => {
    const { color } = getLevelColors(level);

    // SVG parameters
    const svgSize = size;
    const radius = (svgSize / 2) - (strokeWidth / 2);
    const circumference = radius * 2 * Math.PI;
    const offset = circumference * (1 - (level / maxLevel));

    return (
        // Relative container to stack the number on top of the SVG
        <div
            className="level-indicator-container"
            style={{ '--size': `${size}px`, '--level-color': color }}
        >
            {/* The Level Number (sits on top) */}
            <span className="level-indicator-number">{level}</span>

            {/* The SVG Rings (sits in the background) */}
            <svg
                className="level-indicator-svg"
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
            >
                {/* 1. The background "track" circle (faint gray) */}
                <circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    // This is Tailwind for white at 20% opacity
                    className="level-indicator-track"
                />

                {/* 2. The foreground "arc" (colored) */}
                <circle
                    cx={svgSize / 2}
                    cy={svgSize / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    // This creates the arc
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    // 'round' gives rounded ends to the line
                    strokeLinecap="round"
                    // Apply the dynamic color from your utility function
                    className="level-indicator-arc"
                />
            </svg>
        </div>
    );
};