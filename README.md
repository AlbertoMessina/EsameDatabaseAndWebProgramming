# EsameDatabaseAndWebProgramming
Teconology
PHP MYSQL
Javascript CSS HTML5

LARAVEL (COMPOSER)




Clone the progect then in project folder:

composer install

npm install

npm run development

Make a copy of env.example into env and customize it with your database name

cp .env.example .env

After create database and customize env file generate key

php artisan key:generate

--Migrate table--

php artisan migrate



To create link from storage --- public storage
php artisan storage:link 

Add this on env files for default storage --
IMG_EXERCISE_DIR=images/exercise
IMG_USER_DIR=images/users