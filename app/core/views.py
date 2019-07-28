import os
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .models import Photo, Gallery
from django.conf import settings

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
    photos = Photo.objects.all()
    galleries = Gallery.objects.all().filter(visible="True")
    return render(request, 'core/index.html', {'photos': photos, 'galleries': galleries, 'BASE_URL':settings.BASE_URL})

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

    galleries = photo.galleries.all()

    return render(request, 'core/photo_detail.html', {'photo': photo, 'galleries': galleries})
    # return render(request, 'photos/details.html', {'photo': photo,'next_photo': next_photo,'prev_photo': prev_photo, 'key': os.environ['MAPS_KEY']})

def gallery(request,slug):
    gallery = get_object_or_404(Gallery, slug=slug)
    # cover_photo = get_object_or_404(Photo, title=gallery.cover_photo)
    cover_photo = Photo.objects.get(title=gallery.cover_photo)
    photos = gallery.photo_set.all()

    # return render(request, 'core/gallery_detail.html', {'gallery': gallery, 'photos': photos})
    return render(request, 'core/gallery.html', {'gallery': gallery, 'photos': photos, 'cover_photo':cover_photo, 'BASE_URL':settings.BASE_URL})
    # return render(request, 'photos/details.html', {'photo': photo,'next_photo': next_photo,'prev_photo': prev_photo, 'key': os.environ['MAPS_KEY']})

def gallery_content(request,slug):
    gallery = get_object_or_404(Gallery, slug=slug)
    # cover_photo = get_object_or_404(Photo, title=gallery.cover_photo)
    cover_photo = Photo.objects.get(title=gallery.cover_photo)
    photos = gallery.photo_set.all()

    # return render(request, 'core/gallery_detail.html', {'gallery': gallery, 'photos': photos})
    return render(request, 'core/partials/gallery-content.html', {'gallery': gallery, 'photos': photos, 'cover_photo':cover_photo})
    # return render(request, 'photos/details.html', {'photo': photo,'next_photo': next_photo,'prev_photo': prev_photo, 'key': os.environ['MAPS_KEY']})
