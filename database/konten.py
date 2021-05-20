import shelve
import json


def kontoErstellen(key, value):
    with shelve.open("konten.db") as konten:
        if key not in konten:
            konten[key] = value
            shelve.Shelf.close(konten)
            return value
        else:
            return "Konto konnte nicht erstellt werden"


def kontoAusLesen(key):
    with shelve.open("konten.db") as buchungen:
        res = buchungen[key]
        data = json.dumps(res)
        shelve.Shelf.close(buchungen)
        return data


def alleKontoAusLesen():
    dic = {}
    with shelve.open("konten.db") as konten:
        for key in konten:
            dic[key] = konten[key]
            print(dic)
        shelve.Shelf.close(konten)
        data = json.dumps(dic)
        print(data)
        return data


def kontoAktualisieren(key, newValue):
    with shelve.open("konten.db") as konten:
        if key in konten:
            konten[key] = newValue
            shelve.Shelf.close(konten)
            return "Erfolgreich aktualisiert"
        else:
            return "Fehler bei aktualisieren"
