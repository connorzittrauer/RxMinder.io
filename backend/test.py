
### From the backend directory, type
# python test.py
# observe magic

from app import User

#Trey's query
# u = User.query.all()
# for uitem in u:
#     print('\n ' + uitem.email)
#     p = uitem.prescriptions
#     for pitem in p:
#         print('     ' + pitem.name)
#         t = pitem.times
#         for titem in t:
#             print('     '+'     ' + titem.time + " " + titem.meridiem)


##Model for the endpoint
# u = User.query.get(6)
# for p in u.prescriptions:
#     print(p.name)

# user = User.query.get(6)
# times = user.prescriptions
# #i is less than or equal to the length of rx_card
# rx_card = (times[0].times)
# print(len(rx_card))
# for t in rx_card:
#     print(t.time)


user = User.query.get(5)
query = user.prescriptions
#i is less than or equal to the length of rx_card
num_of_prescriptions = 0
for num in query:
    print(num.id)
    num_of_prescriptions +=1    

i = 0
while(i < num_of_prescriptions):
    times = (query[i].times)
    for t in times:
        print(t.time)
    i += 1