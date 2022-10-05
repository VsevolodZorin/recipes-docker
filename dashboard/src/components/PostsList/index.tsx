import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useLazyFetchPostsPaginationQuery } from 'src/services/post.api';
import { IPost } from 'src/types/post/post.interface';
import PostItem from '../PostItem';
import { useInView } from 'react-hook-inview';

interface IPostsList {
	setSelectedPost: (el: IPost) => void;
	isRefreshList?: boolean;
	setIsRefreshList?: (value: boolean) => void;
}

const PostsList: React.FC<IPostsList> = ({ setSelectedPost, isRefreshList, setIsRefreshList }) => {
	const { categoryId } = useParams();
	const [fetchPagination, { data: fetchedData }] = useLazyFetchPostsPaginationQuery();
	const [posts, setPosts] = useState<IPost[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit, setLimit] = useState<number>(50);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [ref, inView] = useInView();

	useEffect(() => {
		const firstInit = async () => {
			if (categoryId) {
				const result = await fetchPagination({ categoryId: categoryId as string, skip, limit });
				if (result.data) {
					setPosts(result.data);
					setSkip(limit);
				}
			}
		};
		firstInit();
	}, [categoryId]);

	// add to postsList
	useEffect(() => {
		if (fetchedData) {
			setPosts(prev => [...prev, ...fetchedData]);
		}
	}, [fetchedData]);

	useEffect(() => {
		if (fetchedData && fetchedData.length < limit) {
			setHasMore(false);
		}
	}, [fetchedData, limit]);

	useEffect(() => {
		if (inView) {
			loadMore();
		}
	}, [inView]);

	useEffect(() => {
		const refresh = async () => {
			if (categoryId) {
				const result = await fetchPagination({
					categoryId: categoryId as string,
					skip: 0,
					// todo fix
					limit: posts.length + 1,
				});
				if (result.data) {
					setPosts(result.data);
					setSkip(result.data.length);
				}
			}
		};
		if (isRefreshList && setIsRefreshList) {
			refresh();
			setIsRefreshList(false);
		}
	}, [isRefreshList, categoryId, posts, skip, limit]);

	const loadMore = useCallback(() => {
		if (categoryId) {
			fetchPagination({ categoryId, skip, limit });
			setSkip(posts.length + limit);
		}
	}, [categoryId, skip, limit, posts]);

	const renderList = useCallback(() => {
		return posts.map((el, index) => (
			<li
				className="posts__list--item"
				key={`postListItem-${index}`}
				onClick={() => setSelectedPost(el)}
			>
				<PostItem post={el} />
			</li>
		));
	}, [posts, setSelectedPost]);

	return (
		<>
			<ul>{renderList()}</ul>
			{hasMore && (
				<button ref={ref} className="btn" onClick={loadMore}>
					loadMore
				</button>
			)}
		</>
	);
};

export default PostsList;
