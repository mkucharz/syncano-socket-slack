import slack from 'slack';

slack.chat.postMessage({
  token: CONFIG.API_KEY,
  channel: ARGS.channel,
  text: ARGS.text
}, (err, data) => {
  console.log(err, data)
})
