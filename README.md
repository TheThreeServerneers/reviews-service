# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API METHODS

### Get a single review
```
GET /reviews/:reviewid
```
Response body is a single review object with the following shape:
```
{
  review_id: Number,
  product_id: Number,
  username: String,
  is_verified: Number,
  review_text: String,
  score: Number,
  found_helpful: Number,
  title, String,
  review_date: Date,
}
```

### Get all reviews for a product
```
GET /reviews/all/:productid
```
Response body is an array of review objects.

### Add a review
```
POST /reviews/
```
Request body must be an object with the following shape:
```
{
  product_id: Number,
  product_name: String,
  user_id: Number,
  user_name: String,
  is_verified: Number,
  review_text: String,
  score: Number,
  found_helpful: Number,
  title, String,
  review_date: Date,
}
```

### Update a review
```
PATCH /reviews/:reviewid
```
Request body must have one or more of the key-value pairs contained in the object described above.

### Delete a review
```
DELETE /reviews/:reviewid
```

### Increment 'found helpful' count for a review
```
POST /reviews/helpful/:reviewid
```