import BaseCommand from '../BaseCommand'

class EslCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'esl'
  }

  invoke () {
    this.reply('Hitastic ESL webpage : https://play.eslgaming.com/team/14621024/')
  }
}


export default EslCommand
