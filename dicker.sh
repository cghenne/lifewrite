mode=$1
case "$mode" in
  "mongoshell" )
      docker run -it --link mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'
      exit 3
      ;;
  "up" )
      docker=$(docker ps)
      if [ $? -eq 1 ]; then
          echo "Either docker is not installed, not running or your internet is down :("
          exit 3
      fi
      docker stop $(docker ps -a -q)
      docker rm $(docker ps -a -q)
      docker pull mongo:latest
      docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles
      docker pull node:latest
      docker run --name node -v "$(pwd)":/data --link mongo:mongo -w /data -p 8082:8082 node bash
      ;;
    "ssh" )
      docker run -it -v "$(pwd)":/data --link mongo:mongo -w /data -p 3000:3000 node bash
      ;;
esac
