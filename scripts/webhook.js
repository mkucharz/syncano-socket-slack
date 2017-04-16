import { logger, event, data } from 'syncano-server'

// console.log('META', META)

const { debug } = logger('webhook.js');

if (ARGS.type === 'url_verification') {
  debug('Verification request')
  setResponse(new HttpResponse(200, ARGS.challenge, 'text/plain'));
} else {
  debug('received:')
  debug(ARGS.POST)

  debug('emiting:', 'message-received')
  event.emit('message-received', ARGS.POST)
  // if (ARGS.event.subtype !== 'bot_message' && ARGS.event.bot_id === CONFIG.BOT_ID) {
  //   event.emit('message-received', ARGS.POST)
  // }
}
