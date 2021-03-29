FROM ruby:3.0.0-alpine AS builder

# ARG default to production settings.
# For development docker-compose file will overrides ARGS.
ARG BUNDLE_WITHOUT="development:test"
ARG RAILS_ENV="production"
ENV BUNDLE_WITHOUT=${BUNDLE_WITHOUT} \
  RAILS_ENV=${RAILS_ENV}

ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install system dependencies.
RUN apk add --update --no-cache \
  build-base \
  tzdata \
  postgresql-dev \
  postgresql-client \
  nodejs \
  yarn \
  git

RUN gem install bundler:2.2.15

# Create working directory.
RUN mkdir -p /app
WORKDIR /app

# Install application dependenices.
COPY Gemfile Gemfile.lock package.json yarn.lock ./
RUN bundle config --local deployment 'true' && \
  bundle install -j $(nproc) -r 3

# Copy the application and generate assets.
COPY . /app
RUN SECRET_KEY_BASE=compile_placeholder bundle exec rake assets:precompile

# Remove all the unnecessary files.
RUN find vendor/bundle -name "*.c" -delete && \
  find vendor/bundle -name "*.o" -delete && \
  find vendor/bundle -name "*.gem" -delete && \
  rm -rf node_modules spec

FROM ruby:3.0.0-alpine

# ARG default to production settings.
# For development docker-compose file will overrides ARGS.
ARG BUNDLE_WITHOUT="development:test"
ARG RAILS_ENV="production"
ENV BUNDLE_WITHOUT=${BUNDLE_WITHOUT} \
  RAILS_ENV=${RAILS_ENV}

# Install the system dependencies.
RUN apk add --update --no-cache \
  tzdata \
  postgresql-client \
  imagemagick && \
  rm -rf /tmp/*

RUN gem install bundler:2.2.15

# Create a user to run the application.
RUN addgroup -S bookrooms && adduser -S bookrooms -g bookrooms
USER bookrooms

# Copy the application from the builder stage.
COPY --from=builder --chown=bookrooms:bookrooms /app /app
WORKDIR /app

# Set the bundle path.
RUN bundle config --local deployment 'true'
RUN bundle install

ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
