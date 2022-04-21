
### From the backend directory, type
# python test.py
# observe magic

from app import User

##Trey's query
u = User.query.all()
for uitem in u:
    print('\n ' + uitem.email)
    p = uitem.prescriptions
    for pitem in p:
        print('     ' + pitem.name)
        t = pitem.times
        for titem in t:
            print('     '+'     ' + titem.time + " " + titem.meridiem)


##Model for the endpoint
# u = User.query.get(1)
# for p in u.prescriptions:
#     print(p.id)


