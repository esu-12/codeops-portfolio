#Dictionary to store customer totals
customer_totals={}

try:
    #open and read the transaction file
    with open("transaction.txt", "r") as file:
        for line in file:
            #remove spaces or newline and split into name and amout
            name, amount=line.strip().split(",")

            #convert amount to a number
            amount=float(amount)

            #add amount to customer's total
            if name in customer_totals:
                customer_totals[name] += amount

            else: 
                customer_totals[name] = amount

    #sort cstomers by total amount (highest first)
    sorted_totals=sorted(
        customer_totals.items(),
        key=lambda x: x[1],
        reverse=True
    )

    #print transaction report
    print("Transaction Report")
    print("----------------------------------")

    for name, total in sorted_totals:
        print(f"{name}: {total}")

    #write the report to a file
    with open("report.txt", "w") as report:
        report.write("Transaction Report\n")
        report.write("---------------------------\n")

        for name, total in sorted_totals:
            report.write(f"{name}: {total}\n")

    print("\nReport sucessfully saved to report.txt")
except FileNotFoundError:
    print("Error: transaction.txt file not found")

except Exception as e:
    print("An error occured:", e)