from account import Account
from savings_account import SavingsAccount
from current_account import CurrentAccount


class AccountFactory:

    @staticmethod
    def create(account_type, owner, account_number, balance, extra=None):

        account_type = account_type.lower()

        if account_type == "account":
            return Account(owner, account_number, balance)

        elif account_type == "savings":
            return SavingsAccount(
                owner,
                account_number,
                balance,
                extra
            )

        elif account_type == "current":
            return CurrentAccount(
                owner,
                account_number,
                balance,
                extra
            )

        else:
            raise ValueError("Invalid account type")