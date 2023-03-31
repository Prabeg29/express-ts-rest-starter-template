build:
	docker-compose --file docker-compose.test.yml build
	docker-compose --file docker-compose.yml build

up:
	docker-compose --file docker-compose.yml up

down:
	docker-compose down --file docker-compose.test.yml --remove-orphans

ssh-app:
	docker exec -it ts-blinqed_app /bin/sh

test:
	make down
	docker-compose --file docker-compose.test.yml up -d
	docker-compose exec app npx prisma migrate reset --force
	docker-compose exec app npm test