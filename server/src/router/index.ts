
import Router from '@koa/router'

import { authRouter } from './auth.router'

import { userRouter } from './user.router'

import { regionRouter } from './region.router'

import { classifyRouter } from './classify.router'

import { couponRouter } from './coupon.router'

import { commentRouter } from './comment.router'

import { bannerRouter } from './banner.router'

export const router = new Router()

router.use(authRouter.routes())

router.use(userRouter.routes())

router.use(regionRouter.routes())

router.use(classifyRouter.routes())

router.use(couponRouter.routes())

router.use(commentRouter.routes())

router.use(bannerRouter.routes())



