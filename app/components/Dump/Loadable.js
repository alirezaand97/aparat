/**
 *
 * Asynchronously loads the component for Dump
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
