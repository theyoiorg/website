import * as migration_20260321_200133 from './20260321_200133';
import * as migration_20260321_202158 from './20260321_202158';
import * as migration_20260322_021249 from './20260322_021249';

export const migrations = [
  {
    up: migration_20260321_200133.up,
    down: migration_20260321_200133.down,
    name: '20260321_200133',
  },
  {
    up: migration_20260321_202158.up,
    down: migration_20260321_202158.down,
    name: '20260321_202158',
  },
  {
    up: migration_20260322_021249.up,
    down: migration_20260322_021249.down,
    name: '20260322_021249'
  },
];
