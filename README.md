
# Matching Card Game

Matching Card Game is a card game in which 12 cards are matched. Each card has a number on the back. Enjoys.

## Technologies
Matching Card Game is created with:
* [Fastapi](https://fastapi.tiangolo.com/)
* [Nextjs](https://nextjs.org/)
* [Nodejs](https://nodejs.org/)
* [Python](https://www.python.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

# Installation

First, you need to clone this project by run command
- ``git clone https://github.com/god00/matching_card_game.git``

**For database**
- install postgres version >= 12

**For backend**
- install python3
- install pip3
- run command
	```bash
	pip install pipenv
	```
- go to "matching_card_game/backend/app/" directory by command
	```bash
	cd ./matching_card_game/backend/app/
	```
- run command 
	```bash
	pipenv install
	pipenv shell
	```
- copy .env.example and rename to .env by command 
	```bash
	cp .env.example .env
	```
- edit config .env to your environment
- run command 
	```bash
	uvicorn main:app --reload
	```
- server is running on http://localhost:8000

**For frontend**

- install [Nodejs](https://nodejs.org/) version >= 12

- go to "matching_card_game/frontend/app/" directory by command 
	```bash
	cd ./matching_card_game/frontend/app/
	```
- copy .env.example and rename to .env by command
	```bash
	cp .env.example .env
	```
- edit config .env to your environment
- run command 
	```bash
	npm run build
	npm start
	```

- server is running on http://localhost:3000

## Alternate Installation

### For Ubuntu 20

- install [Docker](https://www.docker.com/) (or you can easy install by run cammand 
	```bash
	sudo install-docker.sh
	```
- clone the project by command
	```bash
	git clone https://github.com/god00/matching_card_game.git
	```
- and go to "matching_card_game/backend/app/" directory by command
	```bash
	cd ./matching_card_game/backend/app/
	```
- copy .env.docker and rename to .env by command
	```bash
	cp .env.docker .env
	```
- edit config .env to your environment (or use default)
- go to "matching_card_game/frontend/app/" directory by command
	```bash
	cd ../../frontend/app/
	```
- copy .env.example and rename to .env by command
	```bash
	cp .env.example .env
	```
- edit config .env to your environment
- run command
	```bash
	sudo docker-compose up
	```
- server is running on http://localhost:3000

## License

[MIT](https://choosealicense.com/licenses/mit/)