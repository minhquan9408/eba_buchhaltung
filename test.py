import shelve

# getcontext().prec = 2
# a = Decimal(0.1)
# b = Decimal(0.2)
# c = a + b
# print(c)

buchungen = shelve.open("./database/buchungen.db")
konten = shelve.open("./database/konten.db")
print(konten["70002"])
print(f"Konto Input")

# buchung = {"Buchungsnummer":"00002"}
# buchungsfield = ["Buchungstext", "Buchungsschlüssel", "Buchungsdatum"]
# buchung.update({e:input(f"{e}: ") for e in buchungsfield})
# sollField = ["Konto","Betrag"]
# buchung.update({"Soll":{e:input(f"{e}: ") for e in sollField}})
# print(buchung)
# habenField = ["Konto","Betrag"]
# buchung.update({"Haben":{e:input(f"{e}: ") for e in habenField}})
# isVorhanden = True
# while (isVorhanden):
#     kontonummer = input("Kontonummer: ")
#     print(isVorhanden)
#     if kontonummer in konten:
#         print("Kontonummer ist schon vorhanden")
#     else:
#         isVorhanden = False
#         print("BLA")
# konto = {"Kontonummer": input("Kontonummer:"), "Kontoname": input("Kontoname: ")}
# field = ["Soll", "Haben"]
# adresse = ["Straße", "Hausnummer", "PLZ", "Ort"]
# print("Eröffnungsbilanz eingeben")
# konto.update({"Eröffnungsbilanz": {e: input(f"{e}: ") for e in field}})
#
# print("Monatsverkehrzahlen eingeben")
# konto.update({"Monatsverkehrzahlen": {e: input(f"{e}: ") for e in field}})
#
# print("Jahresverkehrzahlen eingeben")
# konto.update({"Jahresverkehrzahlen": {e: input(f"{e}: ") for e in field}})
#
# print("Adresse eingeben")
# konto.update({"Adresse": {e: input(f"{e}: ") for e in adresse}})
#
# print(f"\nKonto: {konto}")

