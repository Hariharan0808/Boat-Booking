from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Boat, Booking

# Web views
def list_users(request):
    users = User.objects.all()
    return render(request, 'bookings/users.html', {'users': users})

def list_boats(request):
    boats = Boat.objects.all()
    return render(request, 'bookings/boats.html', {'boats': boats})

def list_bookings(request):
    bookings = Booking.objects.all()
    return render(request, 'bookings/bookings.html', {'bookings': bookings})

# API views
@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.create(email=data['email'], password=data['password'])
        return JsonResponse({'id': user.id, 'email': user.email})

def read_users(request):
    users = list(User.objects.values())
    return JsonResponse(users, safe=False)

@csrf_exempt
def update_user(request, user_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        user = get_object_or_404(User, pk=user_id)
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        user.save()
        return JsonResponse({'id': user.id, 'email': user.email})

@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        user = get_object_or_404(User, pk=user_id)
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'})

@csrf_exempt
def create_boat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        boat = Boat.objects.create(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            location=data['location'],
            type=data['type'],
            capacity=data['capacity'],
            features=data['features']
        )
        return JsonResponse({'id': boat.id, 'name': boat.name})

def read_boats(request):
    boats = list(Boat.objects.values())
    return JsonResponse(boats, safe=False)

@csrf_exempt
def update_boat(request, boat_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        boat = get_object_or_404(Boat, pk=boat_id)
        boat.name = data.get('name', boat.name)
        boat.description = data.get('description', boat.description)
        boat.price = data.get('price', boat.price)
        boat.location = data.get('location', boat.location)
        boat.type = data.get('type', boat.type)
        boat.capacity = data.get('capacity', boat.capacity)
        boat.features = data.get('features', boat.features)
        boat.save()
        return JsonResponse({'id': boat.id, 'name': boat.name})

@csrf_exempt
def delete_boat(request, boat_id):
    if request.method == 'DELETE':
        boat = get_object_or_404(Boat, pk=boat_id)
        boat.delete()
        return JsonResponse({'message': 'Boat deleted successfully'})

@csrf_exempt
def create_booking(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        boat = get_object_or_404(Boat, pk=data['boat_id'])
        user = get_object_or_404(User, pk=data['user_id'])
        booking = Booking.objects.create(
            boat=boat,
            user=user,
            days=data['days'],
            totalPrice=data['totalPrice']
        )
        return JsonResponse({'id': booking.id, 'boat': booking.boat.name, 'user': booking.user.email})

def read_bookings(request):
    bookings = list(Booking.objects.values())
    return JsonResponse(bookings, safe=False)

@csrf_exempt
def update_booking(request, booking_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        booking = get_object_or_404(Booking, pk=booking_id)
        boat = get_object_or_404(Boat, pk=data['boat_id'])
        user = get_object_or_404(User, pk=data['user_id'])
        booking.boat = boat
        booking.user = user
        booking.days = data.get('days', booking.days)
        booking.totalPrice = data.get('totalPrice', booking.totalPrice)
        booking.save()
        return JsonResponse({'id': booking.id, 'boat': booking.boat.name, 'user': booking.user.email})

@csrf_exempt
def delete_booking(request, booking_id):
    if request.method == 'DELETE':
        booking = get_object_or_404(Booking, pk=booking_id)
        booking.delete()
        return JsonResponse({'message': 'Booking deleted successfully'})
