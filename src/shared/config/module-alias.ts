import * as path from 'path'
import moduleAlias from 'module-alias'

const files = path.resolve(__dirname, '../..')
console.log(path.join(files, 'shared'))

moduleAlias.addAliases({
  '@shared': path.join(files, 'shared'),
  '@users': path.join(files, 'modules/users'),
  '@jobs': path.join(files, 'modules/jobs'),
  '@shippings': path.join(files, 'modules/shippings'),
  '@http': path.join(files, 'http'),
})
