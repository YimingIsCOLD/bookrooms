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

```shell
git clone git@github.com:YimingIsCOLD/bookrooms.git
```

2. Install the dependencies.

```shell
bundle install
yarn install
```

3. Run the database on docker.

```shell
docker run -d \
  --name bookrooms-postgres \
  -e POSTGRES_DB=bookrooms_development \
  -p 5432:5432
  postgres:12-alpine
```

4. Start the rails server. Navigate to `http://localhost:3000`, create a user and start playing around.

```shell
rails server -b 127.0.0.1 -p 3000
```

### Production Setup

1. Clone the repository.

```shell
git clone git@github.com:YimingIsCOLD/bookrooms.git
```

2. Run the following commands and navigate to to `http://localhost:3000`

```shell
docker-compose up --build
```
