# ==========================================
# Day 06 - Bank Project
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
# Base Account
# -----------------------------
class Account:

    def __init__(self, owner, account_number, balance=0):

        self.owner = owner
        self.account_number = account_number
        self._Account__balance = balance

        self._observers = []

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


# ==========================================
# Test Program
# ==========================================

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