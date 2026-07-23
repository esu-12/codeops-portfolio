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


