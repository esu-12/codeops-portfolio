class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be greater than zero.")
            return

        self.__balance += amount
        print(f"ETB {amount:.2f} deposited successfully.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if amount > self.__balance:
            print("Insufficient funds.")
            return

        self.__balance -= amount
        print(f"ETB {amount:.2f} withdrawn successfully.")

    def statement(self):
        print("\n----- Account Statement -----")
        print("Account Type   : Standard")
        print(f"Owner          : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Balance        : ETB {self.balance:.2f}")
        print("-----------------------------")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, rate, balance=0):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("\n----- Account Statement -----")
        print("Account Type   : Savings")
        print(f"Owner          : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Balance        : ETB {self.balance:.2f}")
        print(f"Interest Rate  : {self.rate * 100:.1f}%")
        print("-----------------------------")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, overdraft_limit, balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if amount > self.balance + self.overdraft_limit:
            print("Overdraft limit exceeded.")
            return

        # Access the private balance through name mangling
        self._Account__balance -= amount
        print(f"ETB {amount:.2f} withdrawn successfully.")

    def statement(self):
        print("\n----- Account Statement -----")
        print("Account Type   : Current")
        print(f"Owner          : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Balance        : ETB {self.balance:.2f}")
        print(f"Overdraft      : ETB {self.overdraft_limit:.2f}")
        print("-----------------------------")


# ------------------------------------
# Demonstration (Polymorphism)
# ------------------------------------

accounts = [
    Account("Abebe", "1001", 5000),
    SavingsAccount("Hana", "1002", 0.05, 10000),
    CurrentAccount("Samuel", "1003", 3000, 2000),
]

accounts[1].add_interest()
accounts[2].withdraw(4500)

print("\n===== BANK ACCOUNTS =====")

for account in accounts:
    account.statement()