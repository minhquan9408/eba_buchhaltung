from decimal import Decimal


def increment_booking_keys(buchungen, buchungsschluessel):
    i = 0
    for buchung in buchungen.values():
        if buchung["Buchungsschluessel"] == buchungsschluessel:
            i = i + 1
            print(i)
    if i == 0:
        return f'{buchungsschluessel}1'
    return f'{buchungsschluessel}{i}'


def betrag_mit_steuer(steuerklasse, betrag):
    betrag = float(betrag)
    if steuerklasse == '1571' or steuerklasse == '1771':
        betrag = betrag * 0.93
    if steuerklasse == '1576' or steuerklasse == '1776':
        betrag = betrag * 0.81

    return format(betrag, '.2f')


def steuer_betrag(steuerklasse, betrag):
    betrag = float(betrag)
    if steuerklasse == '1571' or steuerklasse == '1771':
        betrag = betrag * 0.07
    if steuerklasse == '1576' or steuerklasse == '1776':
        betrag = betrag * 0.19
    return format(betrag, '.2f')


def add_betrag(betrag, betrag2):
    betrag = float(betrag)
    betrag2 = float(betrag2)
    result = betrag + betrag2
    return format(result, '.2f')


test = {'1': {'Buchungsdatum': '06/01/2021', 'Buchungsnummer': 1, 'Buchungsschluessel': 'ZE',
              'Buchungstext': 'Zahlungseingang', 'Betrag': '12000', 'Haben': '10002', 'Soll': '70001',
              'Steuerkonto': ' '},
        '2': {'Buchungsdatum': '06/01/2021', 'Buchungsnummer': 1, 'Buchungsschluessel': 'ZE',
              'Buchungstext': 'Zahlungseingang', 'Betrag': '99999', 'Haben': '10002', 'Soll': '70001',
              'Steuerkonto': ' '},
        }
test2 = {"Kontonummer": "800", "Kontoname": "Gezeichnetes Kapital",
         "Beschreibung": "Gezeichnetes Kapital",
         "EroeffnungsbilanzHabenWert": 0,
         "EroeffnungsbilanzSollWert": 0,
         "JahresverkehrszahlenHabenWert": 0,
         "JahresverkehrszahlenSollWert": 0,
         "Buchungen": {}
         }
# erg = test.values()
betrag1 = test['1']['Betrag']
res = betrag_mit_steuer('1571', '2500')
bla = add_betrag(res, 2000)
print(bla)
erg = increment_booking_keys(test, "RA")
print(erg)
test2["Buchungen"]["bla"] = "THIS IS TEST"
test2["EroeffnungsbilanzHabenWert"] = res

print(test2)
