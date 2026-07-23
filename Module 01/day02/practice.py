# ==========================================
# Exercise 1: Temperature Label
# ==========================================

temperature = float(input("Enter temperature in °C: "))

if temperature < 15:
    print("cold")
elif 15 <= temperature <= 28:
    print("warm")
else:
    print("hot")


print("\n" + "=" * 30)

# ==========================================
# Exercise 2: Receipt Loop
# ==========================================

for number in range(1, 11):
    print(f"Receipt #{number}")


print("\n" + "=" * 30)

# ==========================================
# Exercise 3: Even Numbers
# ==========================================

for number in range(1, 21):
    if number % 2 == 0:
        print(number)


print("\n" + "=" * 30)

# ==========================================
# Exercise 4: Discount Function
# ==========================================

def apply_discount(price, percent=10):
    discount = price * (percent / 100)
    return price - discount


print("With default discount (10%):", apply_discount(100))
print("With 20% discount:", apply_discount(100, 20))


print("\n" + "=" * 30)

# ==========================================
# Exercise 5: Countdown
# ==========================================

count = 5

while count >= 1:
    print(count)
    count -= 1

print("Liftoff!")