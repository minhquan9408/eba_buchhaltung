import shelve

# erstellen datenbank für Buchung und Konto
buchungen = shelve.open("buchungen.db")
konten = shelve.open("konten.db")
# Schema für Buchung:

###############
# Buchungen
buchungen["1"] = {"Buchungsnummer": "1", "Buchungstext": "Eröffnungsbuchung", "Buchungsschlüssel": "EB1",
                       "Buchungsdatum": "2021-05-01T00:00:00", "Soll": {"Konto": "9000", "Betrag": 40000},
                       "Haben": {"Konto": "00800", "Betrag": 40000}}
###############
# Sachkonten:
## Computer
konten["201"] = {"Kontonummer": "201", "Kontoname": "Computer", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Mehrwertsteuerinfomation": 0.19}

## Büroeinrichtung
konten["420"] = {"Kontonummer": "420", "Kontoname": "Büroeinrichtung", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

## 9000
konten["9000"] = {"Kontonummer": "9000", "Kontoname": "Saldenvorträge Sachkonten",
                   "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Jahresverkehrszahlen": {"Soll": 78765.44, "Haben": 1234.56},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
##00800
konten["800"] = {"Kontonummer": "800", "Kontoname": "Gezeichnetes Kapital",
                   "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
###############
# Debitoren:
## Kunde 1
konten["10001"] = {"Kontonummer": "10001", "Kontoname": "Kunde 1", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Jahresverkehrszahlen": {"Soll": 13500, "Haben": 13500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
## Kunde 2
konten["10002"] = {"Kontonummer": "10002", "Kontoname": "Kunde 2", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
###############
# Kreditoren:
## Apple
konten["70001"] = {"Kontonummer": "70001", "Kontoname": "Apple Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

## OTTO
konten["70002"] = {"Kontonummer": "70002", "Kontoname": "Otto Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                   "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 1500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}


#####   CRUD-FUNKTIONEN SCHREIBEN  #####
##Buchungen##
# Create_Funktion
def buchungErstellen():
    ## Soll die Buchungsnummer automatisch generiert oder von User definieren?
    isVorhanden = True
    while (isVorhanden):
        buchungsnummer = input("Buchungsnummer: ")
        if buchungsnummer in buchungen:
            print("Buchungsnummer ist schon vorhanden")
        else:
            isVorhanden = False
    buchung = {"Buchungsnummer": buchungsnummer}

    buchungsfield = ["Buchungstext", "Buchungsschlüssel", "Buchungsdatum"]
    buchung.update({e: input(f"{e}: ") for e in buchungsfield})

    field = ["Konto", "Betrag"]
    print("Soll-Konto ausfüllen")
    buchung.update({"Soll": {e: input(f"{e}: ") for e in field}})

    print("Haben-Konto ausfüllen")
    buchung.update({"Haben": {e: input(f"{e}: ") for e in field}})

    buchungen[buchungsnummer] = buchung
    return "Neue Buchung erstellt"


# Read_Funktion
def buchungAuslesen(buchungsnummer):
    if buchungsnummer in buchungen:
        return buchungen[buchungsnummer]
    else:
        return "Buchung existiert nicht!!"


# Update_Funktion
def buchungAktualisieren(buchungsnummer):
    if buchungsnummer in buchungen:
        buchung = {"Buchungsnummer": buchungsnummer}

        buchungsfield = ["Buchungstext", "Buchungsschlüssel", "Buchungsdatum"]
        buchung.update({e: input(f"{e}: ") for e in buchungsfield})

        field = ["Konto", "Betrag"]
        print("Haben-Konto ausfüllen")
        buchung.update({"Soll": {e: input(f"{e}: ") for e in field}})

        print("Haben-Konto ausfüllen")
        buchung.update({"Haben": {e: input(f"{e}: ") for e in field}})

        buchungen[buchungsnummer] = buchung
        return "Buchung aktualisiert!"
    else:
        return "Buchung existiert nicht"


# Delete_Funktion
def buchungLoeschen(buchungsnummer):
    if buchungsnummer in buchungen:
        del buchungen[buchungsnummer]
        return True
    else:
        return "Buchung existiert nicht"


########################
# Konten #
# Create_Funktion
def kontoErstellen():
    isVorhanden = True
    while (isVorhanden):
        kontonummer = input("Kontonummer: ")
        if kontonummer in konten:
            print("Kontonummer ist schon vorhanden")
        else:
            isVorhanden = False

    konto = {"Kontonummer": kontonummer, "Kontoname": input("Kontoname: ")}
    field = ["Soll", "Haben"]
    adresse = ["Straße", "Hausnummer", "PLZ", "Ort"]
    print("Eröffnungsbilanz eingeben")
    konto.update({"Eröffnungsbilanz": {e: input(f"{e}: ") for e in field}})

    print("Monatsverkehrzahlen eingeben")
    konto.update({"Monatsverkehrzahlen": {e: input(f"{e}: ") for e in field}})

    print("Jahresverkehrzahlen eingeben")
    konto.update({"Jahresverkehrzahlen": {e: input(f"{e}: ") for e in field}})

    print("Adresse eingeben")
    konto.update({"Adresse": {e: input(f"{e}: ") for e in adresse}})

    konten[kontonummer] = konto
    return "Neues Konto erstellt"


# Read_Funktion
def kontoAuslesen(kontonummer):
    if kontonummer in konten:
        return konten[kontonummer]
    else:
        return "Konto existiert nicht"


# Update_Funktion
def kontoAktualisieren(kontonummer):
    if kontonummer in konten:
        konto = {"Kontonummer": kontonummer, "Kontoname": input("Kontoname: ")}
        field = ["Soll", "Haben"]
        adresse = ["Straße", "Hausnummer", "PLZ", "Ort"]
        print("Eröffnungsbilanz eingeben")
        konto.update({"Eröffnungsbilanz": {e: input(f"{e}: ") for e in field}})

        print("Monatsverkehrzahlen eingeben")
        konto.update({"Monatsverkehrzahlen": {e: input(f"{e}: ") for e in field}})

        print("Jahresverkehrzahlen eingeben")
        konto.update({"Jahresverkehrzahlen": {e: input(f"{e}: ") for e in field}})

        print("Adresse eingeben")
        konto.update({"Adresse": {e: input(f"{e}: ") for e in adresse}})

        konten[kontonummer] = konto
        return "Konto aktualisiert"
    else:
        return "Konto existiert nicht"


# Delete_Funktion
def kontoLoeschen(kontonummer):
    if kontonummer in konten:
        del konten[kontonummer]
        return True
    else:
        return "Konto existiert nicht"

buchungen.close()
konten.close()
