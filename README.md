# Matching Card Game

## How to install
First, you need to clone this project by run command `git clone https://github.com/god00/matching_card_game.git`

Database
 - install postgres version >= 12

Backend
 - install python3
 - install pip3
 - run command `pip install pipenv`
 - go to "./backend/app/" directory by command `cd ./backend/app/`
 - run command `pipenv install`
 - run command `pipenv shell`
 - copy .env.example and rename to .env
 - edit config .env to your environment
 - run command `uvicorn main:app --reload`
 - server is running on http://localhost:8000

 Frontend
 - install nodejs version >= 12
 - go to "./frontend/app/" directory by command `cd ./frontend/app/`
 - copy .env.example and rename to .env
 - edit config .env to your environment
 - npm run build
 - npm start
 - server is running on http://localhost:3000
## Alternate Installation
### For Ubuntu 20
Run command below
 - `sudo apt update`
 - `sudo apt install apt-transport-https ca-certificates curl software-properties-common`
 - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
 - `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"`
 - `sudo apt update`
 - `apt-cache policy docker-ce`
 - `sudo apt install docker-ce`
 - `sudo apt install docker-compose`
 - `git clone https://github.com/god00/matching_card_game.git`
 - `cd ./matching_card_game`
 - go to "./backend/app/" directory by command `cd ./backend/app/`
 - copy .env.docker and rename to .env by command `cp .env.docker .env`
 - edit config .env to your environment (or use default)
 - go to "./frontend/app/" directory by command `cd ../../frontend/app/`
 - copy .env.example and rename to .env by command `cp .env.example .env`
 - edit config .env to your environment
 - `sudo docker-compose up`
 - server is running on http://localhost:3000


 