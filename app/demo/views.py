import os
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .models import Photo, Gallery

from django.shortcuts import get_object_or_404

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

def index(request):
    photos = Photo.objects.all().filter(recent="true").order_by('-uploaded_at')
    return render(request, 'index.html', {'photos': photos})

def photo_detail(request,slug):
    photo = get_object_or_404(Photo, slug=slug)
    try:
        next_photo = Photo.get_next_by_date(photo, visible=True)
    except:
        next_photo = Photo.objects.filter(visible=True).order_by('uploaded_at')[0]
    try:
        prev_photo = Photo.get_previous_by_date(photo, visible=True)
    except:
        prev_photo = Photo.objects.filter(visible=True).order_by('-uploaded_at')[0]

    return render(request, 'photo_detail.html', {'photo': photo})
    # return render(request, 'photos/details.html', {'photo': photo,'next_photo': next_photo,'prev_photo': prev_photo, 'key': os.environ['MAPS_KEY']})

def gallery_detail(request,slug):
    gallery = get_object_or_404(Gallery, slug=slug)
    return render(request, 'gallery_detail.html', {'gallery': gallery})
    # return render(request, 'photos/details.html', {'photo': photo,'next_photo': next_photo,'prev_photo': prev_photo, 'key': os.environ['MAPS_KEY']})
