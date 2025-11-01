import React from 'react';
import { LevelIndicator } from '../common/LevelIndicator';
import { FavoriteButton } from '../common/FavoriteButton';
import defaultSongImage from '../../assets/images/SongItem_2.png';
import '../../styles/variable.css';
import './SongItem.css';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const SongItem = React.forwardRef(({ song, isFavorite, onToggleFavorite, isTogglingFavorite, isFiltered }, ref) => (
    <li ref={ref} className={classNames('song-item-container', isFiltered && 'filtered', isTogglingFavorite && 'toggling-favorite')}>
        <img
            src={song.image || defaultSongImage}
            alt={`${song.title} artwork`}
            className="song-item-image"

        />
        <div className="song-item-details">
            <h3 className="song-item-title">
                {song.title}
            </h3>
            <span className="song-item-artist">{song.artist}</span>
        </div>

        <div className="song-item-actions">
            <LevelIndicator level={song.level} size={32} />
            <FavoriteButton
                isFavorite={isFavorite}
                onClick={() => onToggleFavorite(song.id)}
                disabled={isTogglingFavorite}
            />
        </div>
    </li>
));
