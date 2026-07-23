class BankConfig:
    """Singleton for shared bank settings."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 3000
        return cls._instance


class Observer:
    def update(self, message):
        pass


class SMSAlert(Observer):
    def update(self, message):
        print(f"[SMS] {message}")


class AuditLog(Observer):
    def update(self, message):
        print(f"[AUDIT] {message}")


class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self._observers = []
        self.history = []  # Transaction stack

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be greater than zero.")
            return

        self._balance += amount
        self.history.append(("deposit", amount))

        self._notify(
            f"{self.owner} deposited ETB {amount:.2f}. "
            f"Balance: ETB {self.balance:.2f}"
        )

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if amount > self.balance:
            print("Insufficient funds.")
            return

        self._balance -= amount
        self.history.append(("withdraw", amount))

        self._notify(
            f"{self.owner} withdrew ETB {amount:.2f}. "
            f"Balance: ETB {self.balance:.2f}"
        )

    def undo_last(self):
        if not self.history:
            print("No transaction to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self._balance -= amount
            print(f"Undo: Deposit of ETB {amount:.2f}")

        elif action == "withdraw":
            self._balance += amount
            print(f"Undo: Withdrawal of ETB {amount:.2f}")

        self._notify(
            f"{self.owner} undid {action} of ETB {amount:.2f}. "
            f"Balance: ETB {self.balance:.2f}"
        )

    def statement(self):
        print("\n----- Standard Account -----")
        print(f"Owner   : {self.owner}")
        print(f"Number  : {self.account_number}")
        print(f"Balance : ETB {self.balance:.2f}")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.rate = BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("\n----- Savings Account -----")
        print(f"Owner   : {self.owner}")
        print(f"Number  : {self.account_number}")
        print(f"Balance : ETB {self.balance:.2f}")
        print(f"Rate    : {self.rate * 100:.1f}%")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = BankConfig().overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if self.balance - amount < -self.overdraft_limit:
            print("Overdraft limit exceeded.")
            return

        self._balance -= amount
        self.history.append(("withdraw", amount))

        self._notify(
            f"{self.owner} withdrew ETB {amount:.2f}. "
            f"Balance: ETB {self.balance:.2f}"
        )

    def statement(self):
        print("\n----- Current Account -----")
        print(f"Owner      : {self.owner}")
        print(f"Number     : {self.account_number}")
        print(f"Balance    : ETB {self.balance:.2f}")
        print(f"Overdraft  : ETB {self.overdraft_limit:.2f}")


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower()

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        if kind == "current":
            return CurrentAccount(owner, number, balance)

        return Account(owner, number, balance)


class AccountRegistry:
    def __init__(self):
        self.accounts = {}      # O(1) lookup
        self.account_list = []  # Preserves insertion order

    def add(self, account):
        self.accounts[account.account_number] = account
        self.account_list.append(account)

    def find(self, account_number):
        return self.accounts.get(account_number)

    def list_all(self):
        return self.account_list

    # ---------------------------------
    # Balance Leaderboard
    # ---------------------------------
    def top_by_balance(self, n):
        return sorted(
            self.account_list,
            key=lambda a: a.balance,
            reverse=True
        )[:n]


    # ---------------------------------
    # Binary Search
    # ---------------------------------
    def binary_search(self, accounts, target):
        left = 0
        right = len(accounts) - 1

        while left <= right:
            middle = (left + right) // 2

            current = accounts[middle].account_number

            if current == target:
                return accounts[middle]

            elif current < target:
                left = middle + 1

            else:
                right = middle - 1

        return None


    def find_by_number(self, number):
        sorted_accounts = sorted(
            self.account_list,
            key=lambda a: a.account_number
        )

        return self.binary_search(sorted_accounts, number)


    # ---------------------------------
    # Recursive Transaction Total
    # ---------------------------------
    def total_transactions_recursive(self, history, index=0):
        if index == len(history):
            return 0

        action, amount = history[index]

        return amount + self.total_transactions_recursive(
            history,
            index + 1
        )


    def total_transactions(self, number):
        account = self.find_by_number(number)

        if account is None:
            return None

        return self.total_transactions_recursive(account.history)


# -----------------------------
# Demonstration
# -----------------------------

config = BankConfig()

sms = SMSAlert()
audit = AuditLog()

registry = AccountRegistry()

accounts = [
    AccountFactory.create("standard", "Abebe", "1001", 5000),
    AccountFactory.create("savings", "Hana", "1002", 10000),
    AccountFactory.create("current", "Samuel", "1003", 2000),
]

for account in accounts:
    account.subscribe(sms)
    account.subscribe(audit)
    registry.add(account)

accounts[0].deposit(1000)
accounts[0].withdraw(500)
accounts[0].undo_last()

accounts[1].add_interest()

accounts[2].withdraw(4500)

print("\nLookup Account 1002")
found = registry.find("1002")
print(found.owner)

print("\n===== ALL ACCOUNTS =====")

for account in registry.list_all():
    account.statement()


print("\n===== TOP BALANCES =====")

for account in registry.top_by_balance(2):
    print(
        account.owner,
        account.balance
    )


print("\n===== BINARY SEARCH =====")

result = registry.find_by_number("1002")

if result:
    print(
        f"Found: {result.owner} "
        f"Balance: {result.balance}"
    )
else:
    print("Account not found")


print("\n===== TRANSACTION TOTAL =====")

total = registry.total_transactions("1001")

print(
    f"Total transactions for 1001: ETB {total:.2f}"
)    