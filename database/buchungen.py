import shelve
import json


def buchungErstellen(key, value):
    with shelve.open("buchungen.db") as buchungen:
        if key not in buchungen:
            buchungen[key] = value
            shelve.Shelf.close(buchungen)
            return value
        else:
            return "Buchung konnte nicht erstellt werden"


def buchungAusLesen(key):
    dic = {}
    with shelve.open("buchungen.db") as buchungen:
        if key in buchungen:
            dic[key] = buchungen[key]
        data = json.dumps(dic)
        return data


def alleBuchungAusLesen():
    dic = {}
    with shelve.open("buchungen.db") as buchungen:
        for key in buchungen:
            dic[key] = buchungen[key]
            print(dic)
        data = json.dumps(dic)
        print(data)
        return data


def buchungAktualisieren(key, newValue):
    with shelve.open("buchungen.db") as buchungen:
        if key in buchungen:
            buchungen[key] = newValue
            shelve.Shelf.close(buchungen)
            return "Erfolgreich aktualisiert"
        else:
            return "Fehler bei aktualisieren"


print(buchungAusLesen("1"))
# alleBuchungAusLesen()
