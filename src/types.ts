export type ViewSearchParam = 'posts' | 'tags';
export type UpsertTagSearchParam = 'true';
export type UpsertTagIdSearchParam = string;
export type OrderDir = 'asc' | 'desc';
export type PostsOrderBy = 'title' | 'slug' | 'createdAt' | 'updatedAt';
export type PostsFilter = {
	tag?: string | string[];
};
export type TagsOrderBy = 'title' | 'slug' | 'createdAt';
