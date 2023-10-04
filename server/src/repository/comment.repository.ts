import { Comment } from '../entity'

import { TourDataSource } from '../data-source'

import { GetCommentListDto, PublishCommentDto } from '../dto/comment.dto'

const commentRepository = TourDataSource.getRepository<Comment>('Comment')

export class CommentRepository {
	public static async find (options: GetCommentListDto) {
		return await commentRepository
			.createQueryBuilder('comment')
			.select([
				'comment.commentUserPhone as commentUserPhone',
				'comment.commentStar as commentStar',
				'comment.commentContent as commentContent'
			])
			.where('comment.commentCouponId = :couponId')
			.setParameters({
				couponId: options.couponId
			})
			.getRawMany()
	}

	public static async publish (options: PublishCommentDto) {
		return await commentRepository
			.insert({
				commentUserPhone: options.commentUserPhone,
				commentStar: options.commentStar,
				commentContent: options.commentContent,
				commentTime: Date.now(),
				commentCouponId: options.couponId
			})
	}
}
