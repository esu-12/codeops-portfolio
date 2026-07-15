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


# Create two accounts
account1 = Account("Abel", "ACC1001", 5000)
account2 = Account("Sara", "ACC1002", 8000)

# Transactions
account1.deposit(2000)
account1.withdraw(1000)

account2.deposit(500)
account2.withdraw(9000)
account2.deposit(-100)

# Final balances
print("\nFinal Balances")
print("----------------")
print(account1.owner, ":", account1.balance)
print(account2.owner, ":", account2.balance)