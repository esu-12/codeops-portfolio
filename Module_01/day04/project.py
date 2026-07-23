class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        """Read-only access to the account balance."""
        return self.__balance

    def deposit(self, amount):
        """Deposit money into the account."""
        if amount <= 0:
            print("Deposit amount must be greater than zero.")
            return

        self.__balance += amount
        print(f"ETB {amount:.2f} deposited successfully.")

    def withdraw(self, amount):
        """Withdraw money from the account."""
        if amount <= 0:
            print("Withdrawal amount must be greater than zero.")
            return

        if amount > self.__balance:
            print("Insufficient funds.")
            return

        self.__balance -= amount
        print(f"ETB {amount:.2f} withdrawn successfully.")

    def statement(self):
        """Display account information."""
        print("\n----- Account Statement -----")
        print(f"Owner          : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Balance        : ETB {self.__balance:.2f}")
        print("-----------------------------")


# -------------------------------
# Example Usage
# -------------------------------

account1 = Account("Abebe Kebede", "100001")

account1.statement()

account1.deposit(5000)
account1.deposit(-100)

account1.withdraw(1500)
account1.withdraw(10000)

account1.statement()

print("\nRead-only balance:", account1.balance)
