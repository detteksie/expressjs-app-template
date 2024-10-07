import { jsonStringify } from './utils/json-stringify';
import { safewait } from './utils/safewait';

global.jsonStringify = jsonStringify;
global.safewait = safewait;
