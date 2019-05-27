# myArtBizAPI
API for myArt.biz

# Connect to docker image & createsuperuser
docker-compose exec app python manage.py migrate
docker-compose exec app python manage.py collectstatic
docker-compose exec app python manage.py makemigrations
docker-compose exec app python manage.py createsuperuser
docker-compose exec app python manage.py runserver
docker-compose exec app pip freeze > requirements.txt
