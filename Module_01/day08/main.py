# ==========================================
# Day 07 - Bank Project
# Singleton, Factory, Observer
# ==========================================


# -----------------------------
# Singleton
# -----------------------------
class BankConfig:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

            cls._instance.interest_rate = 5      # %
            cls._instance.overdraft_limit = 2000

        return cls._instance


# -----------------------------
# Observer Classes
# -----------------------------
class SMSAlert:

    def update(self, message):
        print("SMS:", message)


class AuditLog:

    def update(self, message):
        print("AUDIT:", message)


# -----------------------------
# Transaction
# -----------------------------
class Transaction:

    def __init__(self, transaction_type, amount):
        self.transaction_type = transaction_type
        self.amount = amount

    def __str__(self):
        return f"{self.transaction_type}: ETB {self.amount}"


# -----------------------------
# Base Account
# -----------------------------
class Account:

    def __init__(self, owner, account_number, balance=0):

        self.owner = owner
        self.account_number = account_number
        self._Account__balance = balance

        self._observers = []

        # Transaction history (stack)
        self.history = []

    @property
    def balance(self):
        return self._Account__balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):

        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount):

        if amount <= 0:
            print("Deposit must be positive.")
            return

        self._Account__balance += amount

         # Save transaction
        self.history.append(
          Transaction("Deposit", amount)
     )




        self._notify(
            f"{self.owner} deposited ETB {amount}"
        )

    def withdraw(self, amount):

        if amount <= 0:
            print("Amount must be positive.")
            return

        if amount > self._Account__balance:
            print("Insufficient funds.")
            return

        self._Account__balance -= amount

        # Save transaction
        self.history.append(
       Transaction("Withdraw", amount)
     )

        self._notify(
            f"{self.owner} withdrew ETB {amount}"
        )

    def statement(self):

        print("Account Type : Account")
        print("Owner        :", self.owner)
        print("Number       :", self.account_number)
        print("Balance      :", self.balance)


# -----------------------------
# Savings Account
# -----------------------------
class SavingsAccount(Account):

    def __init__(self, owner, account_number, balance=0):

        super().__init__(
            owner,
            account_number,
            balance
        )

        self.config = BankConfig()

    def add_interest(self):

        interest = (
            self.balance *
            self.config.interest_rate / 100
        )

        self.deposit(interest)

    def statement(self):

        print("Account Type :", "Savings")
        print("Owner        :", self.owner)
        print("Number       :", self.account_number)
        print("Balance      :", self.balance)
        print("Interest     :", self.config.interest_rate, "%")


# -----------------------------
# Current Account
# -----------------------------
class CurrentAccount(Account):

    def __init__(self, owner, account_number, balance=0):

        super().__init__(
            owner,
            account_number,
            balance
        )

        self.config = BankConfig()

    def withdraw(self, amount):

        if amount <= 0:
            print("Amount must be positive.")
            return

        if amount > self.balance + self.config.overdraft_limit:
            print("Overdraft limit exceeded.")
            return

        self._Account__balance -= amount

        # Save transaction
        self.history.append(
      Transaction("Withdraw", amount)
     )

        self._notify(
            f"{self.owner} withdrew ETB {amount}"
        )

    def statement(self):

        print("Account Type :", "Current")
        print("Owner        :", self.owner)
        print("Number       :", self.account_number)
        print("Balance      :", self.balance)
        print("Overdraft    :", self.config.overdraft_limit)


# -----------------------------
# Factory
# -----------------------------
class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":

            return SavingsAccount(
                owner,
                number,
                balance
            )

        elif kind.lower() == "current":

            return CurrentAccount(
                owner,
                number,
                balance
            )

        elif kind.lower() == "account":

            return Account(
                owner,
                number,
                balance
            )

        else:

            raise ValueError(
                "Unknown account type."
            )


class AccountRegistry:

    def __init__(self):
        self.accounts = {}
        self.sorted_numbers = []

    def add(self, account):
        if account.account_number in self.accounts:
            print("Account already exists.")
            return

        self.accounts[account.account_number] = account

        # Keep account numbers sorted for binary search
        self.sorted_numbers = sorted(
        self.accounts.keys()
    )

    def find(self, account_number):
        return self.accounts.get(account_number)

    def list_all(self):
        return [
            self.accounts[number]
            for number in sorted(self.accounts)
        ]

    def undo_last(self, account_number):
        account = self.find(account_number)

        if account is None:
            print("Account not found.")
            return

        if not account.history:
            print("No transactions to undo.")
            return

        last_transaction = account.history.pop()

        if last_transaction.transaction_type == "Deposit":
            account._Account__balance -= last_transaction.amount

        elif last_transaction.transaction_type == "Withdraw":
            account._Account__balance += last_transaction.amount

        print(f"Undo: {last_transaction}")

        account._notify(
            f"{account.owner} undid {last_transaction}"
        )


    # Day 08 - Balance leaderboard
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )[:n]
    

    # Day 08 - Binary search by account number
    def find_by_number(self, account_number):

        numbers = self.sorted_numbers

        low = 0
        high = len(numbers) - 1

        while low <= high:

            mid = (low + high) // 2

            if numbers[mid] == account_number:
                return self.accounts[numbers[mid]]

            elif numbers[mid] < account_number:
                low = mid + 1

            else:
                high = mid - 1

        return None
    

    # Day 08 - Recursive transaction count
    def total_transactions(self, account_number):

        account = self.find(account_number)

        if account is None:
            return 0

        def count(history, index):

            if index == len(history):
                return 0

            return 1 + count(history, index + 1)

        return count(account.history, 0)



# ==========================================
# Main Program
# ==========================================

def main():

    config = BankConfig()

    sms = SMSAlert()
    audit = AuditLog()

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


    # Subscribe observers

    for acc in [account, savings, current]:
        acc.subscribe(sms)
        acc.subscribe(audit)


    print("\nTransactions")
    print("-" * 35)

    account.deposit(1000)
    account.withdraw(500)

    savings.add_interest()

    current.withdraw(4500)
    current.withdraw(1000)


    print("\nStatements")
    print("-" * 35)

    for acc in [account, savings, current]:

        acc.statement()

        print("-" * 35)


    # ==========================================
    # Account Registry Test
    # ==========================================

    registry = AccountRegistry()

    registry.add(account)
    registry.add(savings)
    registry.add(current)


    print("\nRegistry Lookup")
    print("-" * 35)

    result = registry.find("SAV1001")
    result.statement()


    print("\nAll Registered Accounts")
    print("-" * 35)

    for acc in registry.list_all():
        print(acc.account_number, acc.owner)


    print("\nUndo Transaction")
    print("-" * 35)

    registry.undo_last("CUR1001")

    current.statement()


    # ==========================================
    # Day08 Features
    # ==========================================

    print("\nTop Accounts")
    print("-" * 35)

    for acc in registry.top_by_balance(3):
        print(
            acc.account_number,
            acc.owner,
            acc.balance
        )


    print("\nBinary Search")
    print("-" * 35)

    found = registry.find_by_number("SAV1001")

    if found:
        print(
            found.account_number,
            found.owner
        )


    print("\nTransaction Count")
    print("-" * 35)

    total = registry.total_transactions("CUR1001")

    print(
        "John transactions:",
        total
    )


if __name__ == "__main__":
    main()