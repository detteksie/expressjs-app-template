# Express App - Template

Template for Express Application with TypeScript

- prerequisite

```bash
cp template.env .env
```

## Migrations

### DB Migrate

- db create

```bash
yarn seq db:create
```

- db drop

```bash
yarn seq db:drop
```

- migrate all

```bash
yarn seq db:migrate
```

- migrate status

```bash
yarn seq db:migrate:status
```

- revert one

```bash
yarn seq db:undo
```

- revert all

```bash
yarn seq db:undo:all
```

### Model Generate - example

```bash
yarn seq model:generate --underscored --name product --attributes name:string,price:integer
```
