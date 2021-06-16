import shelve

# erstellen datenbank für Buchung und Konto
buchungen = shelve.open("buchungen.db")
konten = shelve.open("konten.db")
buchungen.clear()
konten.clear()

# Sondernkonto
# TODO: attribute für relevant Buchungen ?
konten["800"] = {"Kontonummer": "800", "Kontoname": "Gezeichnetes Kapital",
                 "Beschreibung": "Gezeichnetes Kapital",
                 "EroeffnungsbilanzHabenWert": 0,
                 "EroeffnungsbilanzSollWert": 0,
                 "JahresverkehrszahlenHabenWert": 0,
                 "JahresverkehrszahlenSollWert": 0,
                 "Saldo": 0,
                 "Buchungen": {}
                 }
konten["1400"] = {"Kontonummer": "1400", "Kontoname": "Forderungen aus Lieferungen und Leistungen",
                  "Beschreibung": "Forderungen aus Lieferungen und Leistungen",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {
                      "Soll": {
                          "Beschreibung": "Summe Debitoren Soll",
                          "Betrag": 0,
                          "Buchungsdatum": "",
                          "Buchungsnummer": "",
                          "Buchungsschluessel": "",
                          "Buchungstext": "",
                          "HabenBetragMitSteuer": 0,
                          "HabenKonto": "",
                          "HabenSteuerBetrag": 0,
                          "HabenSteuerKonto": "",
                          "SollBetragMitSteuer": 0,
                          "SollKonto": "",
                          "SollSteuerBetrag": 0,
                          "SollSteuerKonto": "",
                          "Steuerkonto": "",
                      },
                      "Haben": {
                          "Beschreibung": "Summe Debitoren Haben",
                          "Betrag": 0,
                          "Buchungsdatum": "",
                          "Buchungsnummer": "",
                          "Buchungsschluessel": "",
                          "Buchungstext": "",
                          "HabenBetragMitSteuer": 0,
                          "HabenKonto": "",
                          "HabenSteuerBetrag": 0,
                          "HabenSteuerKonto": "",
                          "SollBetragMitSteuer": 0,
                          "SollKonto": "",
                          "SollSteuerBetrag": 0,
                          "SollSteuerKonto": "",
                          "Steuerkonto": "",
                      }
                  }
                  }
konten["1600"] = {"Kontonummer": "1600", "Kontoname": "Verbindlichkeiten aus Lieferungen und Leistungen",
                  "Beschreibung": "Verbindlichkeiten aus Lieferungen und Leistungen",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["1800"] = {"Kontonummer": "1800", "Kontoname": "Privatentnahmen",
                  "Beschreibung": "Entnahmen aus dem Gesellschaftsvermögen ins Privatvermögen",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {
                      "Soll": {
                          "Beschreibung": "Summe Kreditoren Soll",
                          "Betrag": 0,
                          "Buchungsdatum": "",
                          "Buchungsnummer": "",
                          "Buchungsschluessel": "",
                          "Buchungstext": "",
                          "HabenBetragMitSteuer": 0,
                          "HabenKonto": "",
                          "HabenSteuerBetrag": 0,
                          "HabenSteuerKonto": "",
                          "SollBetragMitSteuer": 0,
                          "SollKonto": "",
                          "SollSteuerBetrag": 0,
                          "SollSteuerKonto": "",
                          "Steuerkonto": "",
                      },
                      "Haben": {
                          "Beschreibung": "Summe Kreditoren Haben",
                          "Betrag": 0,
                          "Buchungsdatum": "",
                          "Buchungsnummer": "",
                          "Buchungsschluessel": "",
                          "Buchungstext": "",
                          "HabenBetragMitSteuer": 0,
                          "HabenKonto": "",
                          "HabenSteuerBetrag": 0,
                          "HabenSteuerKonto": "",
                          "SollBetragMitSteuer": 0,
                          "SollKonto": "",
                          "SollSteuerBetrag": 0,
                          "SollSteuerKonto": "",
                          "Steuerkonto": "",
                      }
                  }
                  }
konten["1890"] = {"Kontonummer": "1890", "Kontoname": "Privateinlagen",
                  "Beschreibung": "Einlagen aus dem Privatvermögen ins Gesellschaftsvermögen",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }

konten["9000"] = {"Kontonummer": "9000", "Kontoname": "Saldenvorträge Sachkonten",
                  "Beschreibung": "Gegenkonto für EB-Buchungen der Sachkonten",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["9008"] = {"Kontonummer": "9008", "Kontoname": "Saldenvorträge Debitoren",
                  "Beschreibung": "Gegenkonto für EB-Buchungen der Debitoren",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["9009"] = {"Kontonummer": "9009", "Kontoname": "Saldenvorträge Kreditoren",
                  "Beschreibung": "Gegenkonto für EB-Buchungen Kreditoren",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["8400"] = {"Kontonummer": "8400", "Kontoname": "Erlöse 19% MwSt",
                  "Beschreibung": "Erlöse 19% MwSt",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["1200"] = {"Kontonummer": "1200", "Kontoname": "Bank",
                  "Beschreibung": "Bankkonto",
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }

# Steuerkonto
konten["1571"] = {"Kontonummer": "1571", "Kontoname": "Vorsteuer 7%",
                  "Beschreibung": "Abziehbare Vorsteuer", "Wert": 0.07,
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["1576"] = {"Kontonummer": "1576", "Kontoname": "Vorsteuer 19%",
                  "Beschreibung": "Abziehbare Vorsteuer", "Wert": 0.19,
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["1771"] = {"Kontonummer": "1771", "Kontoname": "Umsatzsteuer 7%",
                  "Beschreibung": "Abzuführende Umsatzsteuer", "Wert": 0.07,
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }
konten["1776"] = {"Kontonummer": "1776", "Kontoname": "Umsatzsteuer 19%",
                  "Beschreibung": "Abzuführende Umsatzsteuer", "Wert": 0.19,
                  "EroeffnungsbilanzHabenWert": 0,
                  "EroeffnungsbilanzSollWert": 0,
                  "JahresverkehrszahlenHabenWert": 0,
                  "JahresverkehrszahlenSollWert": 0,
                  "Saldo": 0,
                  "Buchungen": {}
                  }

# Kreditoren
# Apple
konten["70001"] = {"Kontonummer": "70001", "Kontoname": "Apple Firma",
                   "EroeffnungsbilanzHabenWert": 0,
                   "EroeffnungsbilanzSollWert": 0,
                   "JahresverkehrszahlenHabenWert": 0,
                   "JahresverkehrszahlenSollWert": 0,
                   "Saldo": 0,
                   "Buchungen": {},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

# OTTO
konten["70002"] = {"Kontonummer": "70002", "Kontoname": "Otto Firma",
                   "EroeffnungsbilanzHabenWert": 0,
                   "EroeffnungsbilanzSollWert": 0,
                   "JahresverkehrszahlenHabenWert": 0,
                   "JahresverkehrszahlenSollWert": 0,
                   "Saldo": 0,
                   "Buchungen": {},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

# Debitoren
# Kunde 1
konten["10001"] = {"Kontonummer": "10001", "Kontoname": "Kunde 1",
                   "EroeffnungsbilanzHabenWert": 0,
                   "EroeffnungsbilanzSollWert": 0,
                   "JahresverkehrszahlenHabenWert": 0,
                   "JahresverkehrszahlenSollWert": 0,
                   "Saldo": 0,
                   "Buchungen": {},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}

# Kunde 2
konten["10002"] = {"Kontonummer": "10002", "Kontoname": "Kunde 2",
                   "EroeffnungsbilanzHabenWert": 0,
                   "EroeffnungsbilanzSollWert": 0,
                   "JahresverkehrszahlenHabenWert": 0,
                   "JahresverkehrszahlenSollWert": 0,
                   "Saldo": 0,
                   "Buchungen": {},
                   "Adresse": {"Straße": "Paul-Wittsack_Straße", "Hausnummer": 10, "PLZ": 68519, "Ort": "Mannheim"}}
buchungen.close()
konten.close()
