def digitalClock(seconds):
    
    seconds = seconds % (24 * 60 * 60)

    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

print(digitalClock(5025)) 

print(digitalClock(61201)) 

print(digitalClock(87000))   