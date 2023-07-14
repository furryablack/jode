import { Internal } from '../internal/index.js';

const Path = Internal.Path;

const [Constants, ref] = ((ref) => [ref, ref])({});

ref.ENTITY_SYSTEM_CAPACITY  = 2600;
ref.ENTITY_PROJECT_CAPACITY = 10;
ref.ENTITY_SECTION_CAPACITY = 10;

ref.PATH_ROOT = Path.resolve(Path.dirname(Path.filename()), '..');
ref.PATH_DATA = Path.join(ref.PATH_ROOT, 'data');

ref.CMD_SYSTEM_INPUT_MOD         = {};
ref.CMD_SYSTEM_INPUT_MOD.TAP     = 'tap';
ref.CMD_SYSTEM_INPUT_MOD.NEW     = 'new';
ref.CMD_SYSTEM_INPUT_MOD.PRUNE   = 'prune';
ref.CMD_SYSTEM_INPUT_MOD.DEFAULT = ref.CMD_SYSTEM_INPUT_MOD.TAP;

export { Constants };