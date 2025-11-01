
/**
 * Favorite Button Component (for song items)
 */
import { Heart } from 'lucide-react';

export const FavoriteButton = ({ isFavorite, onClick }) => (
    <button
        onClick={onClick}
        className="text-[#939393] hover:text-white"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
        <Heart
            size={28}
            className={
                isFavorite
                    ? 'fill-[#dc001c] text-[#dc001c]'
                    : 'fill-transparent'
            }
        />
    </button>
);