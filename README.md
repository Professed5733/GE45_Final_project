# Station Diary App

A Digital Station Diary/Log Sheet application to centralize and assist with management and logging of daily incidents of on the ground officers.

# Table of Contents

## Screenshots
<details>
<summary>Click to view SQL Diagram</summary>

![SQL](./public/SQL.png)

</details>

<details>
<summary>Click to view Login Page screenshot</summary>
  
![Login](./public/screenshot1.JPG)

</details>

<details>
<summary>Click to view Dashboard page with no deployment screenshot</summary>

![Dashboard no deployment](./public/screenshot2.JPG)
</details> 

<details>
<summary>Click to view Dashboard page with deployment screenshot</summary>
  
![Dashboard with deployment](./public/screenshot8.JPG)
</details>  

<details>
<summary>Click to view Collapsible drawer screenshot</summary>
  
![Drawer](./public/screenshot3.JPG)
</details>

<details>
<summary>Click to view Deployment page screenshot</summary>
  
![Deployment](./public/screenshot4.JPG)
</details>  

<details>
<summary>Click to view Create Deployment Dialog screenshot</summary>
  
![Create Deployment](./public/screenshot5.JPG)
</details>

<details>
<summary>Click to view Edit Deployment Dialog screenshot</summary>
  
![Edit Deployment](./public/screenshot6.JPG)
</details>

<details>
<summary>Click to view View Logsheet Dialog screenshot</summary>
  
![Logsheet Dialog](./public/screenshot7.JPG)
</details>  

<details>
<summary>Click to view Logsheet screenshot</summary>
  
![Logsheet](./public/screenshot9.JPG)
</details>  

<details>
<summary>Click to view New Log Entry Dialog screenshot</summary>
  
![New Logsheet Entry](./public/screenshot11.JPG)
</details>  

<details>
<summary>Click to view Change Password Dialog screenshot</summary>
  
![Change Password](./public/screenshot10.JPG)
</details>  

<details>
<summary>Click to view Django Admin Page screenshot</summary>
  
![Django Admin Page](./public/screenshot12.JPG)
</details>  

<details>
<summary>Click to view Django Admin Page Create New Account screenshot</summary>
  
![Django Admin Page Create New Account](./public/screenshot13.JPG)
</details>  

<details>
<summary>Click to view Django Admin Account Page screenshot</summary>
  
![Django Admin Account Page](./public/screenshot14.JPG)
</details>  

## Technologies used
* [PostgreSql](https://www.postgresql.org/download/)
* [Python](https://www.python.org/)
* [Django](https://www.djangoproject.com/download/)
* [React](https://react.dev/)
  * [MaterialUI](https://mui.com/)
    
## References

# Backend
## Getting Started
## Installation

requirements.txt
```
asgiref==3.7.2
Django==4.2.4
django-cors-headers==4.2.0
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
psycopg2-binary==2.9.7
PyJWT==2.8.0
python-decouple==3.8
pytz==2023.3.post1
sqlparse==0.4.4
tzdata==2023.3
```
```
pip install django-cors-headers
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install psycopg2-binary
pip install python-decouple
```

## Usage

Create super user
```
python manage.py createsuperuser
```
Run server
```
python manage.py runserver
```

With superuser, create user accounts accordingly.

A standard patrol team would require user with 1 Team Leader role, 1 Deputy Team Leader role and 1 Patrol Officer role. Refer to screenshot example.

<details>
<summary>Click to view Django Admin Account Page screenshot</summary>
  
![Django Admin Account Page](./public/screenshot14.JPG)
</details>  

# Frontend
## Getting Started
## Installation
package.json

**Dependencies**:

1. `@emotion/react` (Version 11.11.1)
2. `@emotion/styled` (Version 11.11.0)
3. `@mui/icons-material` (Version 5.14.8)
4. `@mui/material` (Version 5.14.8)
5. `jwt-decode` (Version 3.1.2)
6. `react` (Version 18.2.0)
7. `react-dom` (Version 18.2.0)
8. `react-router-dom` (Version 6.15.0)

run installation
```
npm i
```
.env file
```
VITE_SERVER=http://127.0.0.1:8000/
```
Run server
```
npm run dev
```

## Usage

