class Account:

    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._subscribers = []

    @property
    def balance(self):
        return self.__balance

    def _update_balance(self, amount):
        self.__balance += amount

    def subscribe(self, observer):
        self._subscribers.append(observer)

    def notify(self, message):
        for observer in self._subscribers:
            observer.update(message)

    def deposit(self, amount):
        if amount > 0:
            self._update_balance(amount)
            print(f"{self.owner} deposited {amount}")
            self.notify(f"{self.owner} deposited {amount}. Balance: {self.balance}")
        else:
            print("Deposit must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Amount must be positive.")
        elif amount > self.balance:
            print("Insufficient funds.")
        else:
            self._update_balance(-amount)
            print(f"{self.owner} withdrew {amount}")
            self.notify(f"{self.owner} withdrew {amount}. Balance: {self.balance}")

    def statement(self):
        print("Account Type: Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")