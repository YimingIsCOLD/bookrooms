#!/usr/bin/env bash

# Wait for database to be ready
until nc -z -v -w30 $BOOKROOMS_DATABASE_HOST $BOOKROOMS_DATABASE_PORT; do
 echo 'Waiting for database...'
 sleep 1
done
echo "Database is up and running!"

# If the database exists, migrate, otherwise setup (create and migrate)
bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:create db:migrate
echo "Database has been created & migrated!"

# Remove a potentially pre-existing server.pid for Rails.
rm -f tmp/pids/server.pid

# Run the Rails server
bundle exec rails server -b 0.0.0.0 -p 8080
