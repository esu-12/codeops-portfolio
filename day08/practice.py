# day08/practice.py

import random
# ============================================
# 1. Recursive sum and count down
# ============================================
def total(nums):
    # Base case
    if len(nums) == 0:
        return 0

    # Recursive case
    return nums[0] + total(nums[1:])

def count_down(n):

    if n == 0:
        return

    print(n)

    count_down(n - 1)

numbers = [10, 20, 30, 40]

print("Recursive Sum:")
print(total(numbers))

print("\nCount Down:")
count_down(5)

# ============================================
# 2. Binary Search
# ============================================
def binary_search(items, target):

    left = 0
    right = len(items) - 1

    while left <= right:

        middle = (left + right) // 2

        if items[middle] == target:
            return middle

        elif items[middle] < target:
            left = middle + 1


        else:
            right = middle - 1

    return -1


balances = [
    1000,
    2500,
    5000,
    7500,
    10000,
    15000
]


print("\nBinary Search:")

index = binary_search(balances, 7500)

print("Index:", index)

# ============================================
# 3. Merge Sort
# ============================================
def merge(left, right):

    result = []

    i = 0
    j = 0


    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])

    result.extend(right[j:])


    return result


def merge_sort(items):

    if len(items) <= 1:
        return items


    middle = len(items) // 2


    left = merge_sort(items[:middle])

    right = merge_sort(items[middle:])


    return merge(left, right)



random_numbers = [
    random.randint(1,100)
    for _ in range(10)
]

print("\nMerge Sort:")

print("Original:", random_numbers)

print("Merge Sort:", merge_sort(random_numbers))

print("Python sorted:", sorted(random_numbers))

# ============================================
# 4. Sort with key
# ============================================
accounts = [
    ("Almaz", 5000),
    ("Dawit", 15000),
    ("Sara", 8000),
    ("Abel", 12000)
]


sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)


print("\nAccounts sorted by balance:")

for account in sorted_accounts:
    print(account)

# ============================================
# 5. Two Pointers
# ============================================
def has_pair(nums, target):

    left = 0
    right = len(nums) - 1


    while left < right:

        current = nums[left] + nums[right]


        if current == target:
            return True


        elif current < target:
            left += 1


        else:
            right -= 1


    return False



balances = [
    1000,
    2000,
    3000,
    5000,
    8000
]


print("\nTwo Pointer:")

print(has_pair(balances, 8000))

print(has_pair(balances, 20000))


# ============================================
# Day08 Account Registry Test
# ============================================

from bank import AccountFactory
from registry import AccountRegistry


account = AccountFactory.create(
    "account",
    "Abel",
    "ACC1001",
    5000
)

savings = AccountFactory.create(
    "savings",
    "Sara",
    "SAV1001",
    8000
)

current = AccountFactory.create(
    "current",
    "John",
    "CUR1001",
    3000
)


account.deposit(1000)
account.withdraw(500)

savings.add_interest()

current.withdraw(4500)


registry = AccountRegistry()

registry.add(account)
registry.add(savings)
registry.add(current)


print("\nRegistry Leaderboard")
print("-" * 35)

for acc in registry.top_by_balance(3):
    print(
        acc.account_number,
        acc.owner,
        acc.balance
    )


print("\nRegistry Binary Search")
print("-" * 35)

result = registry.find_by_number("SAV1001")

if result:
    result.statement()


print("\nRecursive Transaction Count")
print("-" * 35)

print(
    registry.total_transactions("CUR1001")
)