import shelve

# erstellen datenbank für Buchung und Konto
buchungen = shelve.open("buchungen.db")
konten = shelve.open("konten.db")
# Schema für Buchung:
buchungen.clear()
konten.clear()
###############
# Buchungen
# buchungen["1"] = {"Buchungsnummer": "1", "Buchungstext": "Eröffnungsbuchung", "Buchungsschlüssel": "EB1",
#                   "Buchungsdatum": "2021-05-01T00:00:00", "Soll": {"Konto": "9000", "Betrag": 40000},
#                   "Haben": {"Konto": "00800", "Betrag": 40000}}
# ###############
# # Sachkonten:
# ## Computer
# konten["201"] = {"Kontonummer": "201", "Kontoname": "Computer", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
#                  "Mehrwertsteuerinfomation": 0.19}
#
# ## Büroeinrichtung
# konten["420"] = {"Kontonummer": "420", "Kontoname": "Büroeinrichtung", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
#                  "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

##00800
# konten["800"] = {"Kontonummer": "800", "Kontoname": "Gezeichnetes Kapital",
#                  "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0}, "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 0},
#                  "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
# ###############
# # Debitoren:
# ## Kunde 1
# konten["10001"] = {"Kontonummer": "10001", "Kontoname": "Kunde 1", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                    "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
#                    "Jahresverkehrszahlen": {"Soll": 13500, "Haben": 13500},
#                    "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
# ## Kunde 2
# konten["10002"] = {"Kontonummer": "10002", "Kontoname": "Kunde 2", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                    "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
#                    "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
#                    "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
# ###############
# # Kreditoren:
# ## Apple
# konten["70001"] = {"Kontonummer": "70001", "Kontoname": "Apple Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                    "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
#                    "Jahresverkehrszahlen": {"Soll": 2500, "Haben": 2500},
#                    "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
#
# ## OTTO
# konten["70002"] = {"Kontonummer": "70002", "Kontoname": "Otto Firma", "Eröffnungsbilanz": {"Soll": 0, "Haben": 0},
#                    "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
#                    "Jahresverkehrszahlen": {"Soll": 1500, "Haben": 1500},
#                    "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

####### Sondernkonto
# TODO: attribute für relevant Buchungen ?
konten["1400"] = {"Kontonummer": "1400", "Kontoname": "Forderungen",
                  "Beschreibung": "Forderungen aus Lieferungen und Leistungen",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1600"] = {"Kontonummer": "1600", "Kontoname": "Verbindlichkeiten",
                  "Beschreibung": "Verbindlichkeiten aus Lieferungen und Leistungen",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1800"] = {"Kontonummer": "1800", "Kontoname": "Privatentnahmen",
                  "Beschreibung": "Entnahmen aus dem Gesellschaftsvermögen ins Privatvermögen",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1890"] = {"Kontonummer": "1890", "Kontoname": "Privateinlagen",
                  "Beschreibung": "Einlagen aus dem Privatvermögen ins Gesellschaftsvermögen",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }

konten["9000"] = {"Kontonummer": "9000", "Kontoname": "Saldenvorträge Sachkonten",
                  "Beschreibung": "Gegenkonto für EB-Buchungen der Sachkonten",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["9008"] = {"Kontonummer": "9008", "Kontoname": "Saldenvorträge Debitoren",
                  "Beschreibung": "Gegenkonto für EB-Buchungen der Debitoren",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["9009"] = {"Kontonummer": "9009", "Kontoname": "Saldenvorträge Kreditoren",
                  "Beschreibung": "Gegenkonto für EB-Buchungen Kreditoren",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["8400"] = {"Kontonummer": "8400", "Kontoname": "Erlöse 19% MwSt",
                  "Beschreibung": "Erlöse 19% MwSt",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1200"] = {"Kontonummer": "1200", "Kontoname": "Bank",
                  "Beschreibung": "Bankkonto",
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }


# Steuerkonto
konten["1571"] = {"Kontonummer": "1890", "Kontoname": "Vorsteuer 7%",
                  "Beschreibung": "Abziehbare Vorsteuer", "Wert": 0.07,
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1576"] = {"Kontonummer": "1890", "Kontoname": "Vorsteuer 19%",
                  "Beschreibung": "Abziehbare Vorsteuer", "Wert": 0.19,
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1771"] = {"Kontonummer": "1890", "Kontoname": "Umsatzsteuer 7%",
                  "Beschreibung": "Abzuführende Umsatzsteuer", "Wert": 0.07,
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }
konten["1776"] = {"Kontonummer": "1890", "Kontoname": "Umsatzsteuer 19%",
                  "Beschreibung": "Abzuführende Umsatzsteuer", "Wert": 0.19,
                  "Eroeffnungsbilanz": {"Soll": 0, "Haben": 0},
                  "Monatsverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Jahresverkehrszahlen": {"Soll": 0, "Haben": 0},
                  "Buchungen": {}
                  }

buchungen.close()
konten.close()
