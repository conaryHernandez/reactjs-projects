import Raven from 'raven-js';

const sentry_key = '06c6e051cb7a476984582ab872c46563';
const sentry_app = '1084647';
export const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;
// Raven.config('https://06c6e051cb7a476984582ab872c46563@sentry.io/1084647').install()
export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
