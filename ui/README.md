# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To start the project

To run this project, users are required to open two terminal:


### Run `yarn start` in terminal 1

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Run `yarn start-api` in terminal 2

Run the backend API server for login handling.\
The API will operate in [http://localhost:5000](http://localhost:5000)

You will see all the http request with the backend server and respective response in the console.

### Login infomration
# user name: seven
# password: seven


### Troubleshooting

If it is the first time you are running the command "yarn start-api", you might encounter error message regarding the missing of files and functions. 
To handle this error, please follow the steps below.

Step 1:
Delete the env folder insie api folder.

Step 2:
Open a git bash inside the api file. 

Step 3:
Re-install the python virtual environment with command "py -m venv env"

Step 4:
Bound the virtual environment with command "source env/Scripts/activate"

Step 4:
Install the library required for the flask api.
- Run "pip install flask"
- Run "pip install flask_sqlalchemy"
- Run "pip install flask-praetorian"
- Run "pip install flask_cors"
- Run "export FLASK_APP=api.py" and "pip install python-dotenv" to save the environment setting that users dont have to bind the FLASK app and api file again for next running.

Step 5:
Test the api server with command "flask run".\
If you see the message "Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)" that means everything work well and all the settings are done.
- Next time when you try to open the api sever, just key in "yarn start-api" to start the flask sever.

### Library involved
- Reactjs
- Ant Design UI, antd
- cors
- d3.py
- history
- open layer
- react-redux
- react-router
- react-scripts
- react-js-pull-to-refresh
- reacharts
- store
- typeface-roboto
- typescripts

### General Remarks
- Author: Tam Wui Wo, Jacky
- HKUST Team3 Datuminers
- For TEMG4952A Special Project for UBS only.