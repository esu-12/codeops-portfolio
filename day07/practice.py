# day07/practice.py

# ============================================
# 1. Name the Big-O
# ============================================

# List index access
# Big-O: O(1)
# Explanation: Lists store elements in contiguous memory.
# Accessing by index jumps directly to the location.

numbers = [10, 20, 30, 40]
print(numbers[2])


# Single loop
# Big-O: O(n)
# Explanation: The loop runs once for every item.

for number in numbers:
    print(number)


# Nested loop
# Big-O: O(n²)
# Explanation: For every item, we loop through all items again.

for i in numbers:
    for j in numbers:
        print(i, j)


# Dictionary lookup
# Big-O: O(1) average case
# Explanation: Hash tables use keys to directly find values.

accounts = {
    "CBE001": "Almaz",
    "CBE002": "Dawit"
}

print(accounts["CBE001"])


# Binary search
# Big-O: O(log n)
# Explanation: Each step cuts the search space in half.



# ============================================
# 2. List vs Dict Lookup Timing
# ============================================

import time


accounts_list = []

accounts_dict = {}


# Create 100,000 fake accounts

for i in range(100000):
    account = f"CBE-{i}"

    accounts_list.append(account)
    accounts_dict[account] = True


target = "CBE-99999"


# List search

start = time.time()

if target in accounts_list:
    print("Found in list")

end = time.time()

print("List time:", end - start)


# Dictionary search

start = time.time()

if target in accounts_dict:
    print("Found in dictionary")

end = time.time()

print("Dictionary time:", end - start)



# ============================================
# 3. Build a Stack
# ============================================

class Stack:

    def __init__(self):
        self.items = []


    def push(self, item):
        self.items.append(item)


    def pop(self):
        return self.items.pop()


    def peek(self):
        return self.items[-1]


names = ["Almaz", "Dawit", "Sara", "Abel"]

stack = Stack()


for name in names:
    stack.push(name)


reversed_names = []

while stack.items:
    reversed_names.append(stack.pop())


print("Original:", names)
print("Reversed:", reversed_names)



# ============================================
# 4. Build a Queue
# ============================================

from collections import deque


bank_queue = deque()


# enqueue customers

customers = [
    "Almaz",
    "Dawit",
    "Sara",
    "Abel",
    "Mekdes"
]


for customer in customers:
    bank_queue.append(customer)


print("\nBank Service Line:")

while bank_queue:
    customer = bank_queue.popleft()
    print("Serving:", customer)



# ============================================
# 5. Singly Linked List
# ============================================


class Node:

    def __init__(self, data):
        self.data = data
        self.next = None



class LinkedList:

    def __init__(self):
        self.head = None


    def push_front(self, data):

        new_node = Node(data)

        new_node.next = self.head

        self.head = new_node



    def print_all(self):

        current = self.head

        while current:
            print(current.data)

            current = current.next



linked_list = LinkedList()


linked_list.push_front("Account CBE-001")
linked_list.push_front("Account CBE-002")
linked_list.push_front("Account CBE-003")


print("\nLinked List:")

linked_list.print_all()