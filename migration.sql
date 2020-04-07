CREATE TABLE tags (
  id BIGSERIAL PRIMARY KEY,
  value VARCHAR(255)
);

CREATE UNIQUE INDEX idx_tags_uniq_value ON tags (value);

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(60),
	email VARCHAR(255),
	password VARCHAR(255)
);

CREATE UNIQUE INDEX idx_users_uniq_username ON users (username);
CREATE UNIQUE INDEX idx_users_uniq_email ON users (email);

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author_id BIGINT
);

ALTER TABLE posts 
ADD CONSTRAINT fk_posts_users_author_id 
FOREIGN KEY (author_id) REFERENCES users (id);

CREATE TABLE posts_tags (
  post_id BIGINT,
  tag_id BIGINT,
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE posts_tags 
ADD CONSTRAINT fk_posts_tags_posts_post_id
FOREIGN KEY (post_id) REFERENCES posts (id);

ALTER TABLE posts_tags 
ADD CONSTRAINT fk_posts_tags_posts_tag_id 
FOREIGN KEY (tag_id) REFERENCES tag_ids (id);

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  author_id BIGINT,
  post_id BIGINT
);

ALTER TABLE comments 
ADD CONSTRAINT fk_comments_users_author_id 
FOREIGN KEY (author_id) REFERENCES users (id);

ALTER TABLE comments 
ADD CONSTRAINT fk_comments_posts_post_id 
FOREIGN KEY (post_id) REFERENCES posts (id);
