#class demo

class Account:
    def __init__(self, balance):
        self.balance = balance
        self._observers = []

    def subscribe(self, obs):
        self._observers.append(obs)

    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)
            # print(self._observers)

    def withdraw(self, amount):
        self.balance -= amount
        self._notify(f"-{amount} ETB")

account = Account(1000)
# account.subscribe()
account.withdraw(50)


class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")

class AuditLog:
        def update(self, event):
            print(f"[Log] {event}")

            
# acc = AccountFactory.create("savings", "Dawit", "CBE-2")
acc = Account(10000)
acc.subscribe(SMSAlert())
acc.subscribe(AuditLog())
acc.withdraw(5000) # both observers fire
acc.withdraw(1000) # both observers fire