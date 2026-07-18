from account import Account


class SavingsAccount(Account):

    def __init__(self, owner, account_number, balance, interest_rate):
        super().__init__(owner, account_number, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate / 100
        self.deposit(interest)

    def statement(self):
        print("Account Type: Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate}%")