'use client';

import { tileOptions } from '@/data/tiles';
import styles from './TileSelector.module.css';

interface TileSelectorProps {
    selectedTile: string;
    onTileChange: (tileId: string) => void;
}

export default function TileSelector({ selectedTile, onTileChange }: TileSelectorProps) {
    return (
        <div className={styles.container}>
            <select
                value={selectedTile}
                onChange={(e) => onTileChange(e.target.value)}
                className={styles.select}
            >
                {tileOptions.map((tile) => (
                    <option key={tile.id} value={tile.id}>
                        {tile.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
