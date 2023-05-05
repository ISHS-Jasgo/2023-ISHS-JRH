import re

chunk = "12312312242125p"
#print(chunk)

p = re.compile(r'\d{8,20}-?\d{0,8}')
m = p.match(chunk)
print(m.group());