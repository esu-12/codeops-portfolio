class Account:

    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{self.owner} deposited {amount}")
        else:
            print("Deposit must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance -= amount
            print(f"{self.owner} withdrew {amount}")

    def statement(self):
        print(f"Account Type: Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")


class SavingsAccount(Account):

    def __init__(self, owner, account_number, balance, interest_rate):
        super().__init__(owner, account_number, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate / 100
        self.deposit(interest)

    def statement(self):
        print(f"Account Type: Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate}%")

class CurrentAccount(Account):

    def __init__(self, owner, account_number, balance, overdraft_limit):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        elif amount > self.balance + self.overdraft_limit:
            print("Overdraft limit exceeded.")
        else:
            # Access the private balance using name mangling
            self._Account__balance -= amount
            print(f"{self.owner} withdrew {amount}")

    def statement(self):
        print("Account Type: Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")

# Create accounts
account = Account("Abel", "ACC1001", 5000)
savings = SavingsAccount("Sara", "SAV1001", 8000, 5)
current = CurrentAccount("John", "CUR1001", 3000, 2000)

# Perform transactions
account.deposit(1000)
account.withdraw(500)

savings.add_interest()

current.withdraw(4500)   # Allowed because of overdraft
current.withdraw(1000)   # Exceeds overdraft

# Polymorphic loop
accounts = [account, savings, current]

print("\nAccount Statements")
print("--------------------")

for acc in accounts:
    acc.statement()
    print("-" * 30)