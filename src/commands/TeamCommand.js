import BaseCommand from '../BaseCommand'

class TeamCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'team'
  }

  invoke () {
    this.reply('Current roster : Kasket, Kali, Encre, Darky, Krma')
  }
}


export default TeamCommand
