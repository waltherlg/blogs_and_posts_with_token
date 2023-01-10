

import express from 'express'
import {blogsRouter} from "./routes/blogs-route";
import {postsRouter} from "./routes/posts-route";
import {usersRouter} from "./routes/users-route";
import {testingRouter} from "./routes/testing-route";
import {runDb} from "./repositories/db";
import {authRouter} from "./routes/auth-route";

const bodyParser = require('body-parser');
const fs = require("fs");
var path = require('path');

const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json());

app.use('/testing/all-data', testingRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()