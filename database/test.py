import shelve
from database import *

buchungen = shelve.open("buchungen.db")
print(buchungen["000001"])

buchungErstellen()

buchungen.close()
