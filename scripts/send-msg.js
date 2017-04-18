import slack from 'slack';
import { response, logger, event, data } from 'syncano-server'

const { debug } = logger('send-msg.js');

data.slack_team
  .where('team_id', 'eq', ARGS.team_id)
  .with('bot')
  .firstOrFail()
  .then(slackTeam => {
    debug(slackTeam)
    slack.chat.postMessage({
      token: slackTeam.bot.access_token,
      channel: ARGS.channel,
      text: ARGS.text
    }, (err, data) => {
      debug('Error:', err)
      debug('Data:', err)
      if (err) {
        return response(err, 400);
      }
      return response('', 204);
    })
  })
