from account import Account


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
            self._update_balance(-amount)
            print(f"{self.owner} withdrew {amount}")
            self.notify(f"{self.owner} withdrew {amount}. Balance: {self.balance}")

    def statement(self):
        print("Account Type: Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")