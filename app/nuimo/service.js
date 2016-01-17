import io from "npm:socket.io-client"
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  __conn: null,

  setupService: Ember.on('init', function () {
    const conn = io('http://localhost:3000');
    this.set('__conn', conn);

    conn.on('update', update => {
      this.trigger('update', update);
    });
  }),
});
