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

```bash
pnpm seq db:create
```

- db drop

```bash
yarn seq db:drop
```

```bash
pnpm seq db:drop
```

- migrate all

```bash
yarn seq db:migrate
```

```bash
pnpm seq db:migrate
```

- migrate status

```bash
yarn seq db:migrate:status
```

```bash
pnpm seq db:migrate:status
```

- revert one

```bash
yarn seq db:undo
```

```bash
pnpm seq db:undo
```

- revert all

```bash
yarn seq db:undo:all
```

```bash
pnpm seq db:undo:all
```

### Model Generate - example

```bash
yarn seq model:generate --underscored --name product --attributes name:string,price:integer
```

```bash
pnpm seq model:generate --underscored --name product --attributes name:string,price:integer
```
