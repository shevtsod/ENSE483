#!/bin/sh

set -e

# SQL database env vars with defaults
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"

# Wait for SQL database to be available
./wait-for.sh $DB_HOST:$DB_PORT

# Run SQL database migrations
npm run knex -- migrate:latest --verbose

# Run SQL database seeds
npm run knex -- seed:run --verbose

# Execute CMD
exec $@
