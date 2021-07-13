/**
 *
 * Asynchronously loads the component for MyVideosPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
