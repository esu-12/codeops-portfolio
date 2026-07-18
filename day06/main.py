from account_factory import AccountFactory
from sms_alert import SMSAlert

# Create observer
sms = SMSAlert()

# Create accounts using Factory
account = AccountFactory.create(
    "account",
    "Abel",
    "ACC1001",
    5000
)

savings = AccountFactory.create(
    "savings",
    "Sara",
    "SAV1001",
    8000,
    5
)

current = AccountFactory.create(
    "current",
    "John",
    "CUR1001",
    3000,
    2000
)

# Attach observer
account.subscribe(sms)
savings.subscribe(sms)
current.subscribe(sms)

# Transactions
account.deposit(1000)
account.withdraw(500)

savings.add_interest()

current.withdraw(4500)
current.withdraw(1000)

# Polymorphism
accounts = [account, savings, current]

print("\nAccount Statements")
print("-" * 30)

for acc in accounts:
    acc.statement()
    print("-" * 30)