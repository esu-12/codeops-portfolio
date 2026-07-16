from abc import ABC, abstractmethod


# Base class
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Make: {self.make}, Model: {self.model}")

    @abstractmethod
    def wheels(self):
        pass


# Car subclass
class Car(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)

    def wheels(self):
        return 4


# Truck subclass
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(
            f"Make: {self.make}, "
            f"Model: {self.model}, "
            f"Capacity: {self.capacity} tons"
        )

    def wheels(self):
        return 6


# Create objects
car1 = Car("Toyota", "Corolla")
car2 = Car("Honda", "Civic")
truck1 = Truck("Volvo", "FH16", 20)

# Polymorphism
vehicles = [car1, car2, truck1]

print("Vehicle Information")
print("-------------------")

for vehicle in vehicles:
    vehicle.describe()
    print(f"Wheels: {vehicle.wheels()}")
    print("-" * 30)