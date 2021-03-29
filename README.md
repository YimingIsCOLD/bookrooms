# Book Rooms

A simple Ruby on Rails application to facilitate meeting room. Users could check the availability of the rooms by
entering their preferred date, time, and the number of seats required to perform booking.

There are a total of 12 rooms and each room can accommodate either 3, 5 or 8 seats. Users are able to book each room in
a 30 minutes internal, starting from 9am to 6pm.

## Frameworks

### Frontend

- **React**
- **Tailwind CSS** - Easy to use CSS classes
- **Carbon Design** - A ready to use react components

### Backend

- **Ruby on Rails**
- **Devise** - To handle the authentication related stuff
- **RSpec** - A test framework

## Setup

### Development Setup

1. Clone the repository.

```sh
$ git clone git@github.com:YimingIsCOLD/bookrooms.git
```

2. Install the dependencies.

```sh
$ bundle install
$ yarn install
```

3. Run the database on docker and create, migrate and seed it.
   Start the rails server. Navigate to `http://localhost:3000`, create a user and start playing around.

```sh
$ docker run -d \
    --name bookrooms-postgres \
    -e POSTGRES_DB=bookrooms_development \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=secret \
    -p 5432:5432 postgres:12-alpine
$ bundle exec rails db:create db:migrate db:seed
$ rails server -b 127.0.0.1 -p 3000
```

### Production Setup

1. Clone the repository.

```sh
$ git clone git@github.com:YimingIsCOLD/bookrooms.git
```

2. Run the following commands to pull a pre-built docker image to run it, then start up the containers and seed the database. Navigate to `http://localhost:3000`, create a user and start playing around.

```sh
$ docker-compose pull
$ RAILS_MASTER_KEY='89191b157fdfa28053245b2a95336659' docker-compose up -d
$ RAILS_MASTER_KEY='89191b157fdfa28053245b2a95336659' docker-compose run rails bundle exec rails db:seed
```
