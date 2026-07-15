import * as migration_20260715_115711_baseline from './20260715_115711_baseline';
import * as migration_20260715_115812_ecom from './20260715_115812_ecom';

export const migrations = [
  {
    up: migration_20260715_115711_baseline.up,
    down: migration_20260715_115711_baseline.down,
    name: '20260715_115711_baseline',
  },
  {
    up: migration_20260715_115812_ecom.up,
    down: migration_20260715_115812_ecom.down,
    name: '20260715_115812_ecom'
  },
];
