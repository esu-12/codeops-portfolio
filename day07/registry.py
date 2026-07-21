class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    def add(self, account):
        if account.account_number in self.accounts:
            print("Account already exists.")
            return

        self.accounts[account.account_number] = account

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