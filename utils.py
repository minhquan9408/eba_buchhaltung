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


def is_debitor(kontonummer_in_string):
    kontonummer = int(kontonummer_in_string)
    if 10000 <= kontonummer < 70000:
        return True
    return False


def is_kreditor(kontonummer_in_string):
    kontonummer = int(kontonummer_in_string)
    if 70000 <= kontonummer < 100000:
        return True
    return False
