
def getOnlyEvens(numbers):
    even_numbers = []

    
    for index in range(len(numbers)):
        if index % 2 == 0 and numbers[index] % 2 == 0:
            even_numbers.append(numbers[index])

    print(even_numbers)

getOnlyEvens([1, 2, 3, 6, 4, 8])

getOnlyEvens([0, 1, 2, 3, 4])