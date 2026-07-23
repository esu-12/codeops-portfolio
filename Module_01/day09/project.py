"""
Day 09 Larger Project
Model the Bank
"""

from collections import deque


# =====================================
# Account
# =====================================

class Account:
    def __init__(self, number, owner, balance):
        self.number = number
        self.owner = owner
        self.balance = balance

    def __repr__(self):
        return f"{self.number} - {self.owner}: ${self.balance}"


# =====================================
# Branch Tree
# =====================================

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        """
        Recursively calculate the total balance
        of this branch and all sub-branches.
        """
        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


# =====================================
# Build Branch Tree
# =====================================

head_office = Branch("Head Office")

north_region = Branch("North Region")
south_region = Branch("South Region")

city_branch = Branch("City Branch")
town_branch = Branch("Town Branch")
village_branch = Branch("Village Branch")

head_office.add_child(north_region)
head_office.add_child(south_region)

north_region.add_child(city_branch)
north_region.add_child(town_branch)

south_region.add_child(village_branch)


# =====================================
# Add Accounts
# =====================================

a1 = Account("1001", "Alice", 1500)
a2 = Account("1002", "Bob", 2400)
a3 = Account("1003", "Charlie", 1800)
a4 = Account("1004", "David", 3200)
a5 = Account("1005", "Eva", 5000)

head_office.add_account(a1)

north_region.add_account(a2)

city_branch.add_account(a3)

town_branch.add_account(a4)

village_branch.add_account(a5)


# =====================================
# Recursive Total
# =====================================

print("=" * 50)
print("Branch Tree")

print("Total balance of Head Office:")
print(head_office.total_balance())


# =====================================
# Transfers Graph
# =====================================

transfers = {
    "1001": ["1002", "1003"],
    "1002": ["1004"],
    "1003": ["1005"],
    "1004": [],
    "1005": ["1002"]
}


# =====================================
# Breadth-First Search
# =====================================

def bfs(graph, start):
    visited = set()
    queue = deque([start])

    while queue:
        account = queue.popleft()

        if account not in visited:
            visited.add(account)

            for neighbor in graph[account]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited


print("\n" + "=" * 50)
print("Transfers Graph")

reachable = bfs(transfers, "1001")

print("Starting account: 1001")
print("Reachable accounts:", reachable)