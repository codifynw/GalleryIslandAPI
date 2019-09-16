import os
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .models import *
from django.conf import settings
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from api.serializers import *

def image_upload(request):
    if request.method == 'POST':
        image_file = request.FILES['image_file']
        image_type = request.POST['image_type']
        newPhoto = Photo(file=image_file)
        newPhoto.save()
        image_url = newPhoto.file.url
        return render(request, 'upload.html', {
            'image_url': image_url
        })

    return render(request, 'upload.html')

def index(request):
    photos = Photo.objects.all()
    galleries = Gallery.objects.all().filter(visible="True")
    return render(request, 'core/index.html', {'BASE_URL':settings.BASE_URL})

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

    return render(request, 'core/photo_detail.html', {'photo': photo})

def gallery(request,slug):
    gallery = get_object_or_404(Gallery, slug=slug)
    cover_photo = Photo.objects.get(title=gallery.cover_photo)
    photos = gallery.photo_set.all()

    return render(request, 'core/gallery.html', {'gallery': gallery, 'photos': photos, 'cover_photo':cover_photo, 'BASE_URL':settings.BASE_URL})

# def about(request):
#     return render(request, 'core/about.html', {'BASE_URL':settings.BASE_URL})

def page(request,slug):
    page = get_object_or_404(Page, slug=slug)
    layouts = page.mtm.all()
    layout_list = []

    for layout in layouts:
        newdict = {'rank':layout.rank}
        if layout.section is not None:
            print('will handle layout.section when added')
        if layout.splitSection is not None:
            newdict.update(SplitSectionSerializer(layout.splitSection).data)
            layout_list.append(newdict)

    return render(request, 'core/page.html', {'page': page, 'layout': layout_list, 'BASE_URL':settings.BASE_URL})

def gallery_content(request,slug):
    gallery = get_object_or_404(Gallery, slug=slug)
    cover_photo = Photo.objects.get(title=gallery.cover_photo)
    photos = gallery.photo_set.all()

    return render(request, 'core/handlers/gallery-content-handler.html', {'gallery': gallery, 'photos': photos, 'cover_photo':cover_photo})
