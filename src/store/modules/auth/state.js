/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the auth module.
 */

export default {
  authenticated: false,
  userId: null,
  accessToken: '',
  user: {},
  nextPage: '/',
  errorMsg: '',
  statusCode: null,
  fbToken: null,
  error_response: null
}
