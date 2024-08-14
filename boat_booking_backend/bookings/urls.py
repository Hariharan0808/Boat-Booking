from django.urls import path
from .views import (
    list_users, list_boats, list_bookings,
    create_user, read_users, update_user, delete_user,
    create_boat, read_boats, update_boat, delete_boat,
    create_booking, read_bookings, update_booking, delete_booking
)

urlpatterns = [
    # Web views
    path('users/', list_users, name='list_users'),
    path('boats/', list_boats, name='list_boats'),
    path('bookings/', list_bookings, name='list_bookings'),

    # API views
    path('api/create_user/', create_user),
    path('api/read_users/', read_users),
    path('api/update_user/<int:user_id>/', update_user),
    path('api/delete_user/<int:user_id>/', delete_user),
    path('api/create_boat/', create_boat),
    path('api/read_boats/', read_boats),
    path('api/update_boat/<int:boat_id>/', update_boat),
    path('api/delete_boat/<int:boat_id>/', delete_boat),
    path('api/create_booking/', create_booking),
    path('api/read_bookings/', read_bookings),
    path('api/update_booking/<int:booking_id>/', update_booking),
    path('api/delete_booking/<int:booking_id>/', delete_booking),
]
