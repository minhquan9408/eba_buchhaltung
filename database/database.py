import shelve

# erstellen datenbank für Buchung und Konto
buchungen = shelve.open("buchungen.db")
konten = shelve.open("konten.db")
# Schema für Buchung:

###############
# Buchungen
buchungen["000001"] = {"Buchungstext": "Eröffnungsbuchung", "Buchungsschlüssel": "EB1",
                "Buchungsdatum": "2021-05-01T00:00:00", "Soll": {"Konto": "09000","Betrag": 40000} ,
                "Haben": {"Konto": "00800", "Betrag": 40000}}
###############
# Sachkonten:
## Computer
konten["00201"] = {"Kontoname": "Computer", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},"Mehrwertsteuerinfomation":0.19
                   }

## Büroeinrichtung
konten["00420"] = {"Kontoname": "Büroeinrichtung", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

## 9000
konten["09000"] = {"Kontoname": "Saldenvorträge Sachkonten", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 78765.44, "Haben": 1234.56},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
##00800
konten["00800"] = {"Kontoname": "Gezeichnetes Kapital", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
###############
# Debitoren:
## Kunde 1
konten["10001"] = {"Kontoname": "Kunde 1", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 13500, "Haben": 13500},
                  "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
## Kunde 2
konten["10002"] = {"Kontoname": "Kunde 2", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
                  "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
###############
# Kreditoren:
## Apple
konten["70001"] = {"Kontoname": "Apple Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

## OTTO
konten["70002"] = {"Kontoname": "Otto Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
                   "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 1500},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

#####   CRUD-FUNKTIONEN SCHREIBEN  #####
##Buchungen##
#Create_Funktion
def buchungenErstellen():
    return null
#Read_Funktion
def buchungenAuslesen(buchungsnummer):
    if buchungsnummer in buchungen:
        return buchungen[buchungsnummer]
    else:
        return "Buchung existiert nicht!!"
#Update_Funktion
def buchungenAktualisieren():
    return null



#Delete_Funktion
def buchungenLoeschen(buchungsnummer):
    if buchungsnummer in buchungen:
        del buchungen[buchungsnummer]
        return True
    else:
        return "Buchung not existiert"


########################
##Konten##
# Create_Funktion



# Read_Funktion
def kontoAuslesen(kontosnummer):
    if kontosnummer in konten:
        return konten[kontosnummer]
    else:
        return "Konto existiert nicht"

# Update_Funktion

# Delete_Funktion
def kontoLoeschen(kontosnummer):
    if kontosnummer in konten:
        del konten[kontosnummer]
        return True
    else:
        return "Konto existiert nicht"

buchungen.close()
konten.close()
