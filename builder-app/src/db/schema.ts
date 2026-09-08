import { pgTable, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// 1. Better Auth Tables (PostgreSQL + Drizzle)
// ---------------------------------------------------------------------------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  role: text('role').default('user').notNull(), // 'admin' | 'user' | 'editor'
  hasGlobalEditAccess: boolean('has_global_edit_access').default(false).notNull(),
  niche: text('niche'),
  preferredMode: text('preferred_mode'),
  stylePref: text('style_pref'),
  logoUrl: text('logo_url'),
  brandColor: text('brand_color'),
  existingUrl: text('existing_url'),
  onboardingCompletedAt: timestamp('onboarding_completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 2. Decoupled CMS & Project Tables
// ---------------------------------------------------------------------------

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug'),
  templateId: text('template_id'),
  mode: text('mode').default('services').notNull(), // 'services' | 'ecommerce'
  themeId: text('theme_id').default('cyber-slate-volt').notNull(),
  domain: text('domain'),
  
  // Decoupled Headless JSON CMS Content
  content: jsonb('content').default({}).notNull(),
  aiOriginalContent: jsonb('ai_original_content'),
  
  // Access Control & Locking
  isLocked: boolean('is_locked').default(true).notNull(), // Read-only by default
  editAccessApproved: boolean('edit_access_approved').default(false).notNull(),
  
  status: text('status').default('draft').notNull(), // 'draft' | 'deploying' | 'live' | 'error'
  hostingStatus: text('hosting_status').default('none').notNull(),
  publishRequestedAt: timestamp('publish_requested_at'),
  customDomain: text('custom_domain'),
  domainStatus: text('domain_status'),
  repoUrl: text('repo_url'),
  liveUrl: text('live_url'),
  
  ownerId: text('owner_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('projects_owner_idx').on(table.ownerId),
]);

// ---------------------------------------------------------------------------
// 3. Gated Edit Access Requests Table
// ---------------------------------------------------------------------------

export const editAccessRequests = pgTable('edit_access_requests', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  companyName: text('company_name'),
  email: text('email').notNull(),
  reason: text('reason'),
  status: text('status').default('pending').notNull(), // 'pending' | 'approved' | 'rejected'
  reviewedBy: text('reviewed_by'),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('edit_requests_project_idx').on(table.projectId),
  index('edit_requests_status_idx').on(table.status),
]);

export const deployments = pgTable('deployments', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  status: text('status').default('pending').notNull(),
  logs: jsonb('logs').default([]).notNull(),
  repoUrl: text('repo_url'),
  liveUrl: text('live_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const userRelations = relations(user, ({ many }) => ({
  projects: many(projects),
  accessRequests: many(editAccessRequests),
  sessions: many(session),
  accounts: many(account),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  owner: one(user, { fields: [projects.ownerId], references: [user.id] }),
  deployments: many(deployments),
  accessRequests: many(editAccessRequests),
}));

export const editAccessRequestRelations = relations(editAccessRequests, ({ one }) => ({
  project: one(projects, { fields: [editAccessRequests.projectId], references: [projects.id] }),
  user: one(user, { fields: [editAccessRequests.userId], references: [user.id] }),
}));
