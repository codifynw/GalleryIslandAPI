import os
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .models import Photo


def image_upload(request):
    if request.method == 'POST':
        image_file = request.FILES['image_file']
        image_type = request.POST['image_type']
        # if os.getenv('USE_S3'):
        newPhoto = Photo(file=image_file)
        newPhoto.save()
        image_url = newPhoto.file.url
        # else:
        #     fs = FileSystemStorage()
        #     filename = fs.save(image_file.name, image_file)
        #     image_url = fs.url(filename)
        return render(request, 'upload.html', {
            'image_url': image_url
        })
    return render(request, 'upload.html')
