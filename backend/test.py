
### From the backend directory, type
# python test.py
# observe magic

from app import User


u = User.query.all()
for uitem in u:
    print('\n ' + uitem.email)
    p = uitem.perscriptions
    for pitem in p:
        print('     ' + pitem.name)
        t = pitem.times
        for titem in t:
            print('     '+'     ' + titem.time + " " + titem.meridiem)