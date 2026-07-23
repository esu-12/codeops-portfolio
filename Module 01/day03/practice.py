# ==========================
# Exercise 1: Unique cities
# ==========================

cities = [
    "Addis Ababa",
    "Adama",
    "Bahir Dar",
    "Addis Ababa",
    "Hawassa",
    "Adama",
    "Mekelle"
]

unique_cities = set(cities)

print("Unique Cities:")
for city in unique_cities:
    print(city)

print("Total unique cities:", len(unique_cities))
# ==========================
# Exercise 2: Price report
# ==========================
grocery_prices = {
    "Bread": 45,
    "Milk": 80,
    "Sugar": 95,
    "Rice": 180,
    "Eggs": 210
}

print("\nPrice Report:")
for item, price in grocery_prices.items():
    print(f"{item}: {price} ETB")
# ==========================
# Exercise 3: Tax comprehension
# ==========================
prices = [100, 250, 400, 80]

prices_with_tax = [round(price * 1.15,2) for price in prices]

print("\nPrices with 15% Tax:")
print(prices_with_tax)

# ==========================
# Exercise 4: Cheap items
# ==========================

cheap_items = [price for price in prices if price < 200]

print("\nPrices under 200:")
print(cheap_items)

# ==========================
# Exercise 5: Write & read
# ==========================
customer_names = ["Abel", "Sara", "Daniel"]

with open("names.txt", "w") as file:
    for name in customer_names:
        file.write(name + "\n")

print("\nNames from file:")

with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())

# ==========================
# Exercise 6: Safe division
# ==========================

try:
    number = float(input("\nEnter a number: "))
    result = 1000 / number
    print("Result:", result)

except ValueError:
    print("Error: Please enter a valid number.")

except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")