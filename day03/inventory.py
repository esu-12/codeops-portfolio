# Pharmacy Inventory Tracker

def load_inventory(filename):
    inventory = {}

    try:
        with open(filename, "r") as file:
            for line in file:
                item, quantity = line.strip().split(",")
                inventory[item] = int(quantity)

    except FileNotFoundError:
        print("Stock file not found.")
        print("Starting with an empty inventory.")

    return inventory


def update_stock(inventory, item, amount):
    if item in inventory:
        inventory[item] += amount
    else:
        inventory[item] = amount


def show_low_stock(inventory):
    print("\nLow Stock Items:")

    low_stock = {item: qty for item, qty in inventory.items() if qty < 10}

    if low_stock:
        for item, qty in low_stock.items():
            print(f"{item}: {qty}")
    else:
        print("No low stock items.")


def save_inventory(filename, inventory):
    with open(filename, "w") as file:
        for item, quantity in inventory.items():
            file.write(f"{item},{quantity}\n")


def main():
    filename = "stock.txt"

    inventory = load_inventory(filename)

    print("Current Inventory")
    for item, quantity in inventory.items():
        print(f"{item}: {quantity}")

    item = input("\nEnter item to update: ")
    amount = int(input("Enter quantity change (+ to add, - to remove): "))

    update_stock(inventory, item, amount)

    print("\nUpdated Inventory")
    for item, quantity in inventory.items():
        print(f"{item}: {quantity}")

    show_low_stock(inventory)

    save_inventory(filename, inventory)

    print("\nInventory saved successfully.")


if __name__ == "__main__":
    main()