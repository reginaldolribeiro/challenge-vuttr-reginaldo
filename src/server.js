const app = require('./index')
require('../src/database')

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!")
})