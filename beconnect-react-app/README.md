# Untitled project for CIBAY

\<Insert brief description here\>

## Before You Start

We suggest \*UNIX system for development, if you are using Windows, consider switch to \*UNIX enviroment, you may try WSL/VM/Docker  
Make sure you done the following before starting

### Environment (on the remote machine or your own machine)

- Nodejs with yarn
- For linter work properly, install yq and jq (with python3.x)
- vscode with following plugin (optional)  
  - aaron-bond.better-comments
  - eamodio.gitlens
  - esbenp.prettier-vscode
  - ms-vscode-remote.remote-ssh (recommended for connecting to remote machine using vscode)

### Clone this repository

Use SSH method which is more secure. you can refer the guide [here](https://github.com/CUHK-CIBAY/basic)

## In this project

We follow the below conventions

### File Strucutre

- camelCase for filenames
- PascalCase for component names

#### Layout
  
- A global page styling that is shared by at least two or more pages, e.g. DefaultLayout
- Location: `src/layouts`

#### Page

- A view that is accessible by direct link, e.g /login
- The page entry point should be defined and imported into `src/router`
- Should have end-to-end test
- Location: `src/pages`

#### Container

- imported by page and it composed of 1 or more functions
- Hooks, state, reducer, APIs should be called/triggered in this level
- Group by use case, e.g. chat
- Location: `src/containers`

#### Component

- UI codes used by containters
- Group by use case, e.g. chat
- Must have an unit test for this
- Location: `src/components`

### Git

#### Branch

- format: `groupID`-`branchName`
- separate by dash
- branchName should within 2 word (maximum 3 if have to)
- groupId can be
  - wip - work in progress that wont complete soon
  - revamp - a large code rework
  - feat - new/expanding feature
  - fix - bugfix
  - dev - anything else

#### Commit message

- format: `type: subject`
- subject should less than 80 characters
- type can be
  - feat - new/edit feature
  - fix - bugfix
  - docs - documentations
  - style - code style
  - refactor - neither changing feature nor fixing bug
  - perf - performance tuning
  - test - adding test case
  - chore - maintenance
  - revert - undo previous commit
  - wip - well in process
  - other(not suggest) - anything else

### Code

we follow [Airbnb](https://github.com/airbnb/javascript) coding style, here is just some common rule

- one react component per file
- Line length < 120
- double quote (`"`) for TSX arttributes, single quotes(`'`) for other TS.
- End file with newline
- file should not > 500 lines
- use 2 spaces for indentation
- end a simple statement with a semicolon
- varible name
  - camelCase and start with letter
  - ALL_CAPATIAL_LETTER and seperate by underscore(`_`) for global varible/constant
- spacing
  - put space around operators `( = + - * / )` and after comma (`,`) unless
    - after function
    - starting/closing bracket
    - TSX arttibute
  - put space before self closing tag
- object
  - use colon plus one space between each property and its value
  - do not add comma (`,`) after the last -porperty-value pair
  - end with semicolon

## Getting Started

  1. Make sure you `git pull` to get everything up to date.
  2. run `make`

To test the page, run the command below, you can change 3002 to another port if it is occupied. You can also found this command in local.

```bash
export PORT=3002; PORT=$PORT yarn start -p $PORT
```

## Before PR

Please check

- The code works
- `make`, save all files, commit
- Not having unused dependencies
- Not having unnecessary commented code
- If having merge conflict, merge from main, resolve it.
- Rerun `make`, save all files, if any change, commit

## After PR

- Require other to review
- Squash and tag message with issue number
