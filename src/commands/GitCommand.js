import BaseCommand from '../BaseCommand'

class GitCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'git'
  }

  invoke () {
    this.reply('Hitastic-Bot Git repository : https://github.com/KevinFroissart/histastic-bot')
  }
}


export default GitCommand
