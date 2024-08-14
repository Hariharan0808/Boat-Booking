from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email

class Boat(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    capacity = models.IntegerField()
    features = models.TextField()

    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    days = models.IntegerField()
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    bookingDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email} booked {self.boat.name}'
