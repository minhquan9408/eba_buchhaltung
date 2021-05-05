import shelve
from database.database import *
# getcontext().prec = 2
# a = Decimal(0.1)
# b = Decimal(0.2)
# c = a + b
# print(c)

buchungen = shelve.open("./database/buchungen.db")
konten = shelve.open("./database/konten.db")
print(konten["70002"])

buchungErstellen()
