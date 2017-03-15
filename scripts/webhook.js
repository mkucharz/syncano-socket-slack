import connect from 'syncano-server'

const s = connect() // Connect to Syncano

if (ARGS.type === 'url_verification') {
  console.log('Verification request')
  setResponse(new HttpResponse(200, ARGS.challenge, 'text/plain'));
} else {
  console.log('MSG received:')
  console.log(ARGS.POST)
  if (ARGS.event.subtype !== 'bot_message' && ARGS.event.bot_id === CONFIG.BOT_ID) {
    s.event.emit('slack-msg-rec', { payload: ARGS.POST });
  }
}
