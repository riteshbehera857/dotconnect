const mongoose = require('mongoose')
const app = require('./index')
const PORT = process.env.PORT || 8080

const DB = process.env.MONGODB_CONNECTION_URL.replace('<PASSWORD>', process.env.MONGODB_DB_PASS)

mongoose
    .connect(DB)
    .then((conn) =>
        console.log(`Database successfully running on ${conn.connection.host}`)
    )
    .catch((err) => console.log(`${err}`));

app.listen(PORT, () => {
    console.log('🚀 Server is running on http://localhost:8000')
})