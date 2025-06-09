import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { useBlogFilters } from '../store'

export default function List({ posts, className }: any) {
	return (
		<ul className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8', className)}>
			{posts.map((post: any) => (
				<li key={post._id} className="group relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-[#FF007F] via-[#FF6EC7] to-[#C154C1] hover:scale-[1.02] transition-transform duration-300">
					<Link href={`/blog/${post.metadata?.slug?.current}`}>
						<div className="flex flex-col h-full text-white">
							{post.metadata?.image && (
								<div
									className="aspect-[4/5] w-full bg-cover bg-top rounded-t-lg"
									style={{
										backgroundImage: `url(${urlFor(post.metadata.image).width(800).height(1000).url()})`,
									}}
								></div>
							)}
							<div className="p-6 flex flex-col flex-1 justify-between bg-black/40 backdrop-blur-sm">
								<h3 className="text-xl font-bold mb-2">{post.metadata.title}</h3>
								<p className="text-sm line-clamp-3 mb-4">{post.metadata.description || ''}</p>
								<time className="text-xs font-mono opacity-75">{formatDate(post.publishDate)}</time>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}

export function filterPosts(posts: Sanity.BlogPost[]) {
	const { category, author } = useBlogFilters()

	return posts.filter((post) => {
		if (category !== 'All' && author)
			return (
				post.authors?.some(({ slug }) => slug?.current === author) &&
				post.categories?.some(({ slug }) => slug?.current === category)
			)

		if (category !== 'All')
			return post.categories?.some(({ slug }) => slug?.current === category)

		if (author)
			return post.authors?.some(({ slug }) => slug?.current === author)

		return true
	})
}
