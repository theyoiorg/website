import * as migration_20260321_200133 from './20260321_200133';
import * as migration_20260321_202158 from './20260321_202158';

export const migrations = [
  {
    up: migration_20260321_200133.up,
    down: migration_20260321_200133.down,
    name: '20260321_200133',
  },
  {
    up: migration_20260321_202158.up,
    down: migration_20260321_202158.down,
    name: '20260321_202158'
  },
];
