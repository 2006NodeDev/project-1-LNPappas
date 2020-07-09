create schema ers;
set schema 'ers';

create table roles( --table order creation matters
	"role_id" serial primary key,
	"role" text
);

create table users(
	"user_id" serial primary key, --don't provide value for serial column
	"username" text not null unique,
	"password" text not null, --"" b/c password is a keyword
	"first_name" text not null,
	"last_name" text not null,
	"email" text,
	"role" int not null references roles("role_id") --FK to roles table 
);
	