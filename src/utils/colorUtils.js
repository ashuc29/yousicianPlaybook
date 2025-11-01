import '../styles/variable.css';
export const getLevelColors = (level) => {
    if (level >= 1 && level <= 5) {
        return {
            color: 'var(--color-level-green)',
            bg: 'bg-[var(--color-level-green)]/20',
            text: 'text-[var(--color-level-green)]',
            border: 'border-[var(--color-level-green)]',
            active: 'bg-[var(--color-level-green)] text-black',
        };
    }
    if (level >= 6 && level <= 10) {
        return {
            color: 'var(--color-level-orange)',
            bg: 'bg-[var(--color-level-orange)]/20',
            text: 'text-[var(--color-level-orange)]',
            border: 'border-[var(--color-level-orange)]',
            active: 'bg-[var(--color-level-orange)] text-black'
        };
    }
    if (level >= 11 && level <= 15) {
        return {
            color: 'var(--color-level-red)',
            bg: 'bg-[var(--color-level-red)]/20',
            text: 'text-[var(--color-level-red)]',
            border: 'border-[var(--color-level-red)]',
            active: 'bg-[var(--color-level-red)] text-white',
        };
    }
    return {
        color: 'var(--color-grey-light)',
        bg: 'bg-[var(--color-grey-light)]/20',
        text: 'text-[var(--color-grey-light)]',
        border: 'border-[var(--color-grey-light)]',
        active: 'bg-[var(--color-grey-light)] text-black',
    };
};