import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from .models import User


def users(req):
    users = list(User.objects.all().values())
    return HttpResponse(json.dumps(users, ensure_ascii=False), content_type="application/json")


def add_user(req):
    data = json.loads(req.body)
    User.objects.create(
        name=data['name'], email=data['email'])
    return HttpResponse(status=200)


def delete_user(req):
    User.objects.get(id=req.GET['id']).delete();
    return HttpResponse(status=200)


def edit_user(req):
    data = json.loads(req.body)
    User.objects.filter(id=req.GET['id']).update(name=data['name'], email=data['email']);
    return HttpResponse(status=200)