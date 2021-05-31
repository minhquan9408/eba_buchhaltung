import shelve
from database import *

buchungen = shelve.open("buchungen.db")
print(buchungen["000001"])
print(buchungen["000002"])

buchungen.close()
