# ==========================================
# DAY 04 PRACTICE
# Classes, Objects, Encapsulation, @property
# ==========================================


# =====================================================
# Exercise 1: Book Class
# =====================================================

print("=" * 50)
print("Exercise 1: Book Class")
print("=" * 50)


class Book:

    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"{self.title} by {self.author} ({self.pages} pages)")


book1 = Book("Python Basics", "John Smith", 250)
book2 = Book("Data Structures", "Alice Brown", 320)

book1.describe()
book2.describe()


# =====================================================
# Exercise 2: Product Class
# =====================================================

print("\n" + "=" * 50)
print("Exercise 2: Product Class")
print("=" * 50)


class Product:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n
        print(f"Restocked {n} {self.name}(s).")

    def sell(self, n):
        self.quantity -= n
        print(f"Sold {n} {self.name}(s).")


product = Product("Laptop", 45000, 10)

print("Initial Quantity:", product.quantity)

product.sell(2)
product.restock(5)

print("Final Quantity:", product.quantity)


# =====================================================
# Exercise 3: Make Quantity Private
# =====================================================

print("\n" + "=" * 50)
print("Exercise 3: Private Quantity")
print("=" * 50)


class ProductPrivate:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        self.__quantity -= n


product = ProductPrivate("Phone", 30000, 20)

print("Initial Quantity:", product.quantity)

product.sell(5)

print("After Selling:", product.quantity)

product.restock(3)

print("After Restocking:", product.quantity)


# =====================================================
# Exercise 4: Validation
# =====================================================

print("\n" + "=" * 50)
print("Exercise 4: Validation")
print("=" * 50)


class ProductValidated:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        if n > 0:
            self.__quantity += n
            print(f"Restocked {n} item(s).")
        else:
            print("Restock amount must be positive.")

    def sell(self, n):
        if n <= 0:
            print("Sale amount must be positive.")

        elif n > self.__quantity:
            print("Not enough stock.")

        else:
            self.__quantity -= n
            print(f"Sold {n} item(s).")


product = ProductValidated("Printer", 12000, 5)

print("Current Quantity:", product.quantity)

product.sell(2)

print("Quantity:", product.quantity)

product.sell(10)

print("Quantity:", product.quantity)

product.restock(4)

print("Quantity:", product.quantity)

product.restock(-2)


# =====================================================
# Exercise 5: Prove Object Independence
# =====================================================

print("\n" + "=" * 50)
print("Exercise 5: Object Independence")
print("=" * 50)


class ProductInventory:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        if n > 0:
            self.__quantity += n

    def sell(self, n):
        if 0 < n <= self.__quantity:
            self.__quantity -= n
        else:
            print(f"Cannot sell {n} {self.name}(s).")


product1 = ProductInventory("Laptop", 45000, 10)
product2 = ProductInventory("Phone", 30000, 20)
product3 = ProductInventory("Tablet", 25000, 15)

print("Before Changes")
print("----------------")
print(product1.name, "Quantity:", product1.quantity)
print(product2.name, "Quantity:", product2.quantity)
print(product3.name, "Quantity:", product3.quantity)

print("\nSelling 4 Laptops...\n")

product1.sell(4)

print("After Changes")
print("----------------")
print(product1.name, "Quantity:", product1.quantity)
print(product2.name, "Quantity:", product2.quantity)
print(product3.name, "Quantity:", product3.quantity)


print("\n" + "=" * 50)
print("End of Day 04 Practice")
print("=" * 50)