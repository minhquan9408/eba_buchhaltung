import shelve
# erstellen datenbank für Buchung und Konto

from decimal import *

getcontext().prec = 2
a = Decimal(0.1)
b = Decimal(0.2)
c = a + b
print(c)
data = {1: 'Quan', 2: 'Quang', 5: 'Marco'}
print(data.get(3, 'Not Found'))
print(data)

buchungen = shelve.open("buchungen.db")
konten = shelve.open("konten.db")
print(buchungen['123456'])
# Schema für Buchung:
# {}
buchungen["100001"] = {}
buchungen.close()
