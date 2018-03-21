/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
  IS_LOGGED_IN: state => state.authenticated,
  USER_ID: state => state.userId,
  NEXT_PAGE: state => (typeof state.nextPage === 'undefined' ? '/' : state.nextPage),
  ERROR_MSG: state => state.errorMsg,
  FB_TOKEN: state => state.fbToken,
  ERROR_RESPONSE: state => state.error_response
}
