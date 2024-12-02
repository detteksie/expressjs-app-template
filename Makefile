include .env
export

COMPOSE=docker compose -f ./docker/compose.yaml
ifeq ($(env),prod)
	COMPOSE=docker compose -f ./docker/compose.production.yaml
endif
ifeq ($(env),deploy)
	COMPOSE=docker compose -f ./compose.yaml
endif

EXEC=$(COMPOSE) exec -it
NPM_RUN=$(EXEC) server npm run
ifeq ($(p),host)
	NPM_RUN=npm run
endif

exec:
	$(EXEC) $(ARGS)

npm-run:
	$(NPM_RUN) $(ARGS)

# *
# docker compose
# *

dc:
	${COMPOSE} $(ARGS)

dc-up:
	${COMPOSE} up -d $(ARGS)

dc-down:
	${COMPOSE} down $(ARGS)
