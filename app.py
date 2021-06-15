import shelve
import flask
from flask import Flask, request
from utils import *

app = Flask(__name__)


@app.route("/api/buchungen/all", methods=['GET'])
def get_all_booking():
	dic = {}
	with shelve.open("buchungen.db") as buchungen:
		for key in buchungen:
			dic[key] = buchungen[key]
	data = flask.jsonify(dic)
	return data


@app.route('/api/buchungen/add', methods=['POST'])
def add_booking():
	request_data = request.get_json()
	x = list(request_data.keys())
	buchungsId = x[0]
	buchungsschluessel = request_data[buchungsId]["Buchungsschluessel"]
	neueBuchung = request_data[buchungsId]
	habenKonto = neueBuchung["HabenKonto"]
	sollKonto = neueBuchung["SollKonto"]
	buchungText = neueBuchung["Buchungstext"]
	# Caculate Betrag und Steuer
	betrag = neueBuchung["Betrag"]
	steuerKonto = neueBuchung["Steuerkonto"]
	betragMitSteuer = betrag_mit_steuer(steuerKonto, betrag)
	steuerBetrag = steuer_betrag(steuerKonto, betrag)
	neueBuchung["Betrag"] = betrag_mit_steuer("", betrag)
	neueBuchung["SollBetragMitSteuer"] = betrag_mit_steuer("", betrag)
	neueBuchung["HabenBetragMitSteuer"] = betrag_mit_steuer("", betrag)

	if steuerKonto == '1571' or steuerKonto == '1576':
		neueBuchung["SollSteuerBetrag"] = steuerBetrag
		neueBuchung["SollSteuerKonto"] = steuerKonto
		neueBuchung["SollBetragMitSteuer"] = betragMitSteuer

	if steuerKonto == '1771' or steuerKonto == '1776':
		neueBuchung["HabenSteuerBetrag"] = steuerBetrag
		neueBuchung["HabenSteuerKonto"] = steuerKonto
		neueBuchung["HabenBetragMitSteuer"] = betragMitSteuer

	with shelve.open("buchungen.db", writeback=True) as buchungen:
		newBuchungsschuessel = increment_booking_keys(buchungen, buchungsschluessel)
		neueBuchung["Buchungsschluessel"] = newBuchungsschuessel
		# TODO: UPDATE Betrag for relevant KONTO in konten.db
		# TODO: UPDATE Steuer Konto, HOW TO UPDATE 1400 & 1600( maybe add fake Buchungen )
		with shelve.open("konten.db", writeback=True) as konten:
			altJVHabenWert = konten[habenKonto]["JahresverkehrszahlenHabenWert"]
			altJVSollWert = konten[sollKonto]["JahresverkehrszahlenSollWert"]
			newJVHabenWert = add_betrag(altJVHabenWert, neueBuchung["HabenBetragMitSteuer"])
			newJVSollWert = add_betrag(altJVSollWert, neueBuchung["SollBetragMitSteuer"])
			# Update Haben Konto #
			# Update 1400 and 1600
			if is_debitor(habenKonto):
				konten["1400"]["JahresverkehrszahlenHabenWert"] = add_betrag(
					konten["1400"]["JahresverkehrszahlenHabenWert"], neueBuchung["HabenBetragMitSteuer"])

			if is_kreditor(habenKonto):
				konten["1600"]["JahresverkehrszahlenHabenWert"] = add_betrag(
					konten["1600"]["JahresverkehrszahlenHabenWert"], neueBuchung["HabenBetragMitSteuer"])

			neueBuchungfuerHabenKonto = neueBuchung.copy()
			neueBuchungfuerHabenKonto["GegenKonto"] = sollKonto
			neueBuchungfuerHabenKonto["SollBetragMitSteuer"] = 0
			konten[habenKonto]["JahresverkehrszahlenHabenWert"] = newJVHabenWert
			konten[habenKonto]["Buchungen"][buchungsId] = neueBuchungfuerHabenKonto

			# Update Soll Konto
			if is_debitor(sollKonto):
				konten["1400"]["JahresverkehrszahlenSollWert"] = add_betrag(
					konten["1400"]["JahresverkehrszahlenSollWert"], neueBuchung["SollBetragMitSteuer"])
			if is_kreditor(sollKonto):
				konten["1600"]["JahresverkehrszahlenSollWert"] = add_betrag(
					konten["1600"]["JahresverkehrszahlenSollWert"], neueBuchung["SollBetragMitSteuer"])

			neueBuchungfuerSollKonto = neueBuchung.copy()
			neueBuchungfuerSollKonto["GegenKonto"] = habenKonto
			neueBuchungfuerSollKonto["HabenBetragMitSteuer"] = 0
			konten[sollKonto]["JahresverkehrszahlenSollWert"] = newJVSollWert
			konten[sollKonto]["Buchungen"][buchungsId] = neueBuchungfuerSollKonto

			# UPDATE STEUER
			if steuerKonto == '1571' or steuerKonto == '1576':
				konten[steuerKonto]["Buchungen"][buchungsId] = neueBuchungfuerSollKonto.copy()
				konten[steuerKonto]["Buchungen"][buchungsId]["SollBetragMitSteuer"] = steuerBetrag

			if steuerKonto == '1771' or steuerKonto == '1776':
				konten[steuerKonto]["Buchungen"][buchungsId] = neueBuchungfuerHabenKonto.copy()
				konten[steuerKonto]["Buchungen"][buchungsId]["HabenBetragMitSteuer"] = steuerBetrag

			if buchungText == "Eroeffnungsbuchung":
				konten[habenKonto]["EroeffnungsbilanzHabenWert"] = betragMitSteuer
				konten[sollKonto]["EroeffnungsbilanzSollWert"] = betragMitSteuer

			shelve.Shelf.close(konten)
		if buchungsId not in buchungen:
			print(neueBuchung)
			buchungen[buchungsId] = neueBuchung
			shelve.Shelf.close(buchungen)
			return request_data
		else:
			return "Buchung konnte nicht erstellt werden", 400


@app.route('/api/buchungen/update', methods=['POST'])
def update_booking():
	request_data = request.get_json()
	print(request_data)
	x = list(request_data.keys())
	key = x[0]
	with shelve.open("buchungen.db") as buchungen:
		if key in buchungen:
			buchungen[key] = request_data[key]
			shelve.Shelf.close(buchungen)
			return request_data
		else:
			return "Buchung nicht existiert"


@app.route("/api/konten/all", methods=['GET'])
def get_all_accounts():
	dic = {}
	with shelve.open("konten.db") as konten:
		for key in konten:
			dic[key] = konten[key]
		return dic


@app.route('/api/konten/add', methods=['POST'])
def add_account():
	request_data = request.get_json()
	print(request_data)
	x = list(request_data.keys())
	key = x[0]
	with shelve.open("konten.db") as konten:
		if key not in konten:
			konten[key] = request_data[key]
			shelve.Shelf.close(konten)
			return request_data
		else:
			return "Konto konnte nicht erstellt werden", 400


@app.route('/api/konten/update/<kontonummer>', methods=['POST'])
def update_account(kontonummer):
	request_data = request.get_json()
	print(request_data)
	x = list(request_data.keys())
	key = x[0]
	with shelve.open("konten.db") as konten:
		if kontonummer in konten:
			konten[kontonummer] = request_data[key]
			shelve.Shelf.close(konten)
			return request_data
		else:
			return "Konto nicht existiert"


if __name__ == '__main__':
	app.run(debug=True)
