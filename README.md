# Splitlux Backend

### To run the app
1. Install the dependencies in requirement.txt (Tip: create a virtual environment before hand)
2. Make migrations with - `python manage.py makemigrations`
3. Migrate with - `python manage.py migrate`
4. Run server with - `python manage.py runserver`

### Create a superuser
Run `python manage.py createsuperuser`

### Creating a virtual environment
Requirements: virtualenv
Installation: `pip install virtualenv`

1. Create the environment - `python -m venv env`
2. Activate the environment - `env/Scripts/activate`
3. Deactivate the environment - `env/Scripts/deactivate`

### Class diagram
![class diagram](docs/images/erd.png)

### End Points
|ENDPOINT | HTTPS METHODS | DESCRIPTION | 
| ------------- |:-------------:| ------------- |
|/auth/checkServer | GET | Checks if server is running |
|/auth/users | POST | Create a new user |
|/auth/users | GET | Retrieves user data |
|/auth/jwt/create/ | POST | Login user |
|/auth/users/reset_password/ | POST | Sends an email to reset password|
|/auth/users/reset_password_confirm/ | POST | Confirm reset password |
|/auth/jwt/verify/ | POST | Verify if token is valid |
|/auth/updateProfilePic/ | POST | Update profile pic |
|/auth/updateProfile/ | POST | Update profile |
| | | |
|/group/list/ | GET | Returns a simplified list of groups |
|/group/list/?n=3 | GET | Returns a simplified list of 3 groups |
|/group/list/?q=jap | GET | Returns a simplified list of groups with 'jap' in name |
|/group/list/?n=3&q=jap | GET | Returns a simplified list of 3 groups with 'jap' in name |
|/group/create/ | POST | Creates a new group |
|/group/join/ | PUT | Join a group with group_id |
|/group/reopen/ | PUT | Reopen a group with group_id |
|/group/members/<uuid:id>/ | GET | Retrieves the group members of a group |
|/group/<uuid:id>/ | GET | Retrieves the data of a group |
|/group/calculatepayment/<uuid:id>/ | GET | Calculates the payments and closes the group |
|/group/payment/<uuid:id>/ | GET | Gets the payments |
|  |  |  |
|/transaction/create/ | POST | Creates a new transaction |
|/transaction/<uuid:id>/ | GET | Gets the specified transaction |
|/transaction/delete/<uuid:id>/ | DELETE | Delete the specified transaction |

