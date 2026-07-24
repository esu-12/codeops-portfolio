def returnFactorial(num):
    factorial = 1

    for i in range(1, num + 1):
        factorial *= i

    return factorial

print(returnFactorial(5))  
print(returnFactorial(6))   
print(returnFactorial(0))   