import app from './app'
import { sequelize } from './database/database'
import { PORT } from './utils/config'
import { swaggerDocs } from './docs/swagger'

async function main() {
  try {
    await sequelize.authenticate()
    console.log('Successful connection to the database')
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}\n`)
      swaggerDocs(app, PORT)
    })
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`)
  }
}

main()
