# customer_report.py

# List of customers (name, TeleBirr balance)
customers = [
    ("Abebe", 1200),
    ("Hana", 850),
    ("Samuel", 450),
    ("Meron", 300),
    ("Dawit", 1600)
]

# Function to determine customer tier
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"


# Counters
premium_count = 0
standard_count = 0
basic_count = 0

print("====== TeleBirr Customer Report ======\n")

# Loop through customers
for name, balance in customers:
    customer_tier = tier(balance)

    print(f"Name: {name}")
    print(f"Tier: {customer_tier}")
    print(f"Balance: {balance} ETB")
    print("-" * 30)

    # Count each tier
    if customer_tier == "Premium":
        premium_count += 1
    elif customer_tier == "Standard":
        standard_count += 1
    else:
        basic_count += 1

# Summary
print("\n====== Summary ======")
print(f"Premium Customers : {premium_count}")
print(f"Standard Customers: {standard_count}")
print(f"Basic Customers   : {basic_count}")