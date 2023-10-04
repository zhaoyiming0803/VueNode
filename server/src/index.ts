import 'reflect-metadata'

import Koa from 'koa'

import { router } from './router'

import bodyParser from 'koa-bodyparser'

import { initORM } from './data-source'

import { cors } from './middleware'

initORM()

const app = new Koa()

app.use(cors)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8091, () => {
	console.log('App listen port 8091 successfully !')
})

