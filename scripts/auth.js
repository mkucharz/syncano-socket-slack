import slack from 'slack';
import { logger, event, data, response } from 'syncano-server'


const { debug } = logger('auth.js');

slack.oauth.access({
  code: ARGS.code,
  state: ARGS.state,
  client_id: CONFIG.CLIENT_ID,
  client_secret: CONFIG.CLIENT_SECRET
}, (err, resp) => {
  debug('Error', err)
  debug('Data', resp)
  if (err) {
    return response(err.message, 400, 'text/plain');
  }

  let createPromise = Promise.resolve();
  if (resp.bot) {
    createPromise = data.slack_bot.create({
      bot_user_id: resp.bot.bot_user_id,
      bot_access_token: resp.bot.bot_access_token
    })
  }

  return createPromise
    .then(bot => {
      console.log('Bot', bot.id)
      return data.slack_team.create({
          access_token: resp.access_token,
          scope: resp.scope.split(','),
          user_id: resp.user_id,
          team_name: resp.team_name,
          team_id: resp.team_id,
          bot: bot.id
        })
    })
    .then(resp => {
      debug('Team added:', resp)
      return response('<h3>Application was successfully installed!</h3>', 200, 'text/html');
    })
    .catch(err => {
      debug('Error Response')
       err.response.text()
        .then(text => {
          debug(text)
          return response(text, 400, 'text/plain');
        })
    })
})
