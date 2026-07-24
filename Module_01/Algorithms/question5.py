
def isDual(numbers):
    counts = {}

    for num in numbers:
        if num in counts:
            counts[num] = counts[num] +1
        else:
            counts[num] = 1

    for count in counts.values():
        if count != 2:
            return 0

    return 1

print(isDual([1, 2, 1, 3, 3, 2]))  
print(isDual([2, 5, 2, 5, 5]))      
print(isDual([3, 1, 1, 2, 2]))      
print(isDual([4, 4, 7, 7]))      
print(isDual([]))                   