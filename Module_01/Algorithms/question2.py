def reverseCompare(number):

    num_str = str(number)

    reversed_num = int(num_str[::-1])

    if number > reversed_num:
        print("Ok")
    else:
        print("Not ok")

reverseCompare(72) 
reverseCompare(23) 