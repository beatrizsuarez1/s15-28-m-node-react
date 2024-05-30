import 'dotenv/config'
import app from './app'

function main () {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`\n🚀 Server running on port ${process.env.PORT}\n`)
    })
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`)
  }
}

main()
