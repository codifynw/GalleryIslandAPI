# GalleryIsland
API in app, react frontend in dir

# Connect to docker image & createsuperuser
docker-compose exec app python manage.py migrate
docker-compose exec app python manage.py runserver
docker-compose exec app pip freeze > requirements.txt
docker-compose exec app python manage.py makemigrations
docker-compose exec app python manage.py createsuperuser

# Sample .env
DEV_DB_NAME=string
DEV_DB_HOST=string
PROD_DB_NAME=string
PROD_DB_USER=string
PROD_DB_PASSWORD=string
PROD_DB_HOST=url
SECRET_KEY=string
DJANGO_DEBUG=boolean
AWS_ACCESS_KEY_ID=string
AWS_SECRET_ACCESS_KEY=string
AWS_STORAGE_BUCKET_NAME=string
USE_S3=boolean
