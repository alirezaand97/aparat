/**
 *
 * Asynchronously loads the component for CountableTextArea
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
