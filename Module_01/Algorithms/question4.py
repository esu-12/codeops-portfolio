
def checkMeera(numbers):
    for num in numbers:
        if num * 2 in numbers:
            print("I am NOT a Meera array")
            return



    print("I am a Meera array")

checkMeera([10, 4, 0, 5])
checkMeera([7, 4, 9])
checkMeera([1, -6, 4, -3])