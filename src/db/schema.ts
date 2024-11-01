import { createId } from '@paralleldrive/cuid2';
import { relations, sql } from 'drizzle-orm';
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role', { enum: ['user', 'moderator'] })
		.notNull()
		.default('user'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
});

export const tags = sqliteTable('tags', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
});

export const tagsRelations = relations(tags, ({ one, many }) => ({
	tagsToPosts: many(tagsToPosts),
	user: one(users, {
		fields: [tags.createdBy],
		references: [users.id],
	}),
}));

export const posts = sqliteTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text('title').notNull().unique(),
	slug: text('slug').notNull().unique(),
	body: text('body').notNull().default(''),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	user: one(users, {
		fields: [posts.createdBy],
		references: [users.id],
	}),
	tagsToPosts: many(tagsToPosts),
}));

export const tagsToPosts = sqliteTable(
	'tags_to_posts',
	{
		tagId: text('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' }),
		postId: text('post_id')
			.notNull()
			.references(() => posts.id, { onDelete: 'cascade' }),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.tagId, t.postId] }),
	})
);

export const tagsToPostsRelations = relations(tagsToPosts, ({ one }) => ({
	tag: one(tags, {
		fields: [tagsToPosts.tagId],
		references: [tags.id],
	}),
	post: one(posts, {
		fields: [tagsToPosts.postId],
		references: [posts.id],
	}),
}));
