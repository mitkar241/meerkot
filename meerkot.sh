#!/bin/env sh

bot_name=$1
port=$2
action=$3

node_loc="/usr/bin/node"
server_loc="/opt/${bot_name}"

start() {
  sudo ${node_loc} ${server_loc}/index.js &
}

stop() {
  sudo kill -9 $(sudo netstat -nlp | grep :${port} | tr -s ' ' | cut -d ' ' -f '7' | cut -d '/' -f '1')
}

restart() {
  stop
  start
}

reload() {
  start
}

case "$action" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "restart")
    restart
    ;;
  "reload")
    reload
    ;;
  *)
    echo "Not a valid option."
    ;;
esac
