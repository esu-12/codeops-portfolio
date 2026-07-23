
#Our class instructor examplify how ValueError: Unknown: fixed  occur

from abc import ABC,abstractmethod


class Account(ABC):
    def __init__(self, owner: str, number: str):
        self.account_number = owner
        self.balance = number

class SavingsAccount(Account):
    def __init__(self, owner: str, number: str):
        super().__init__(owner, number)
    def interest(self): 
        return 0.05
    

class CurrentAccount(Account):
    def __init__(self, owner: str, number: str):
        super().__init__(owner, number)




class AccountFactory:
    @staticmethod
    def create(kind, owner, number):
        if kind == "savings":
            return SavingsAccount(owner, number)
        if kind == "current":
            return CurrentAccount(owner, number)
        raise ValueError(f"Unknown: {kind}")
    
    
acc = AccountFactory.create("fixed", "Almaz", "CBE-1")