import BaseCommand from '../BaseCommand'

class AuthorCommand extends BaseCommand {
  constructor ({ }) {
    super(...arguments)
  }

  shouldInvoke () {
    return this._command === 'author'
  }

  invoke () {
    this.reply('Inspired by the r6Stats dev team, by Froissart Kévin : kevin.froissart69@gmail.com')
  }
}


export default AuthorCommand
