import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInView } from 'react-hook-inview';
import { useLazyFetchPostsPaginationQuery } from 'src/services/post.api';
import { IPost } from 'src/types/post/post.interface';
import PostItem from '../PostlistItem';

interface IPostsList {}

const PostsList: React.FC<IPostsList> = () => {
	const { categoryId } = useParams();
	const [fetchPagination, { data: fetchedData }] = useLazyFetchPostsPaginationQuery();
	const [posts, setPosts] = useState<IPost[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit, setLimit] = useState<number>(2);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [ref, inView] = useInView();
	const navigate = useNavigate();

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
		return () => {
			setSkip(0);
			setPosts([]);
		};
	}, [categoryId, limit]);

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

	const loadMore = useCallback(() => {
		if (categoryId) {
			fetchPagination({ categoryId, skip, limit });
			setSkip(posts.length + limit);
		}
	}, [categoryId, skip, limit, posts]);

	const handleClick = (el: IPost) => {
		navigate(`/category/${categoryId}/post/${el._id}`);
	};

	const renderList = useCallback(() => {
		return posts.map((el, index) => (
			<li
				className="posts__list--item"
				key={`postListItem-${index}`}
				onClick={() => handleClick(el)}
			>
				<PostItem post={el} />
			</li>
		));
	}, [posts]);

	return (
		<>
			<ul className="posts__list">{renderList()}</ul>
			{hasMore && <div ref={ref}></div>}
		</>
	);
};

export default PostsList;
