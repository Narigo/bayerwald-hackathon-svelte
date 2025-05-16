#!/usr/bin/env bash

#--- INITIALISATION

set +euo pipefail

root=$0
command=$1
shift

failed_checks=()
optional_checks=()

#--- HELPER FUNCTIONS

function ask_install() {
    app_to_install=$1
    if ! command -v brew &>/dev/null; then
        echo "'brew' command could not be found."
        echo "Please check https://brew.sh to help installation."
        exit 1
    fi
    read -rp "Do you want to install $app_to_install now? [y/N] " yn
    case $yn in
    [yY]*) brew install "$app_to_install" ;;
    *)
        echo "Aborting, since $app_to_install is not installed."
        return 1
        ;;
    esac
}

function check_if_cmd_exists() {
    if which "$1" >/dev/null; then
        echo "✅ command '$1' found."
    else
        echo "❌ command '$1' NOT found!"
        if [ "${2-}" != "" ]; then
            ask_install "$2"
            exit_code=$?
            if [ $exit_code -ne 0 ]; then
                failed_checks+=("non-existent-command:$1")
            fi
        else
            echo "no $2 set"
        fi
    fi
}

function check_if_optional_cmd_exists() {
    if which "$1" >/dev/null; then
        echo "✅ command '$1' found."
    else
        echo "🟨 command '$1' NOT found. Please make sure you don't need it. ${2-}"
        optional_checks+=("optional-command-missing:$1")
    fi
}

function check_if_optional_env_is_set() {
    if [ "${!1}" != "" ]; then
        echo "✅ variable '$1' is set."
    else
        echo "🟨 variable '$1' is NOT set! Please make sure you don't need it. $2"
        optional_checks+=("optional-variable-missing:$1")
    fi
}

function check_if_env_var_is_set() {
    if [ "${!1}" != "" ]; then
        echo "✅ variable '$1' is set."
    else
        echo "❌ variable '$1' is NOT set! ${2-Please make sure it is set.}"
        failed_checks+=("non-existent-variable:$1")
    fi
}

function check_if_file_present() {
    if [ -f "$1" ]; then
        echo "✅ file '$1' is present!"
    else
        echo "❌ file '$1' is NOT present! ${2-Please provide the file.}"
        failed_checks+=("no-such-file:$1")
    fi
}

#--- COMMANDS

function usage() {
    cat <<EOF
Usage: $0 <COMMAND>

Available options for COMMAND:

  start
      Starts all services.

  stop
      Stops all services.

  setup
      Starts services in setup mode (will create / populate database if it
      didn't exist) and exposes MariaDB.

  reset
      Stops all services and removes the volumes.

  help
      Shows this usage information.

EOF
}

function doctor() {
    echo "Checking necessary commands"
    check_if_optional_cmd_exists "brew" "Necessary to install most software."
    check_if_cmd_exists "docker"
    echo
    echo "Checking environment setup"
    check_if_file_present ".env" "Please copy .env.local.example to .env and set it up according to your needs"

    if [ ${#failed_checks[@]} -gt 0 ]; then
        if [ ${#failed_checks[@]} -eq 1 ]; then
            echo "Please fix the open issue."
        else
            echo "Please fix all ${#failed_checks[@]} open issues."
        fi
        return 1
    else
        echo "No issues found. Please check with the team if you experience problems!"
    fi
}

case "$command" in
"help")
    usage "$root"
    ;;
"doctor")
    doctor
    ;;
"start")
    docker compose up -d
    ;;
"stop")
    docker compose down
    ;;
"setup")
    docker compose -f docker-compose.yml -f docker-compose.setup.yml up -d
    ;;
"reset")
    read -rp "Do you want to remove all volumes? [y/N] " yn
    case $yn in
    [yY]*)
        docker compose -f docker-compose.yml -f docker-compose.setup.yml down -v
        ;;
    *)
        echo "Aborted, did not remove the existing volumes."
        ;;
    esac
    ;;
*)
    echo "Missing or invalid COMMAND $command"
    echo ""
    usage
    ;;
esac
