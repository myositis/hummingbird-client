import Ember from 'ember';
import DS from 'ember-data';

const {
  Service,
  get,
  isPresent,
  computed,
  inject: { service }
} = Ember;
const { PromiseObject } = DS;

export default Service.extend({
  session: service(),
  store: service(),
  userId: null,

  isAuthenticated: computed.alias('session.isAuthenticated'),

  account: computed('userId', function() {
    const userId = get(this, 'userId');
    if (isPresent(userId)) {
      return get(this, 'store').peekRecord('user', userId);
    }
  }),

  authenticateWithOAuth2(data) {
    return get(this, 'session').authenticate('authenticator:oauth2', data);
  },

  invalidate() {
    return get(this, 'session').invalidate();
  }
});