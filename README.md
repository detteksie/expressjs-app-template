# Express App - Template

[Template for Express Application with TypeScript](https://github.com/ssamsara98/express-app-template.git)

#### prerequisite

```sh
cp template.env .env
```

## Installation

```sh
pnpm install
```

## Migrations

run `npx sequelize --help` for more help!

### DB Migrate

- db create

```sh
pnpm seq db:create
```

- db drop

```sh
pnpm seq db:drop
```

- migrate all

```sh
pnpm seq db:migrate
```

- migrate status

```sh
pnpm seq db:migrate:status
```

- revert one

```sh
pnpm seq db:undo
```

- revert all

```sh
pnpm seq db:undo:all
```

### Model Generate - example

`pnpm seq model:generate --underscored --name <model_name> --attributes <attribute_name_1>:<data_type_1>,<attribute_name_n>:<data_type_n>`

```sh
pnpm seq model:generate --underscored --name product --attributes name:string,price:integer,is_published:boolean
```

// to set id, use this example -> `select setval('users_id_seq', 1000);`
