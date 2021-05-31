import flask
from flask import Flask, render_template, request
import shelve

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    # return render_template('home.html')
    return """<form action="" method="get">
                    <input type="text" name="celsius">
                    <input type="submit" value="Convert">
                  </form>"""


# Controller for bookings
@app.route('/api/buchungen/<buchungsnummer>', methods=['GET'])
def get_booking(buchungsnummer):
    dic = {}
    with shelve.open("buchungen.db") as buchungen:
        if buchungsnummer in buchungen:
            dic[buchungsnummer] = buchungen[buchungsnummer]
        return render_template("booking.html", data=dic)


@app.route("/api/buchungen/all", methods=['GET'])
def get_all_booking():
    dic = {}
    with shelve.open("buchungen.db") as buchungen:
        for key in buchungen:
            dic[key] = buchungen[key]
    # return render_template('booking.html', data=dic)
    data = flask.jsonify(dic)
    return data


@app.route('/api/buchungen/add', methods=['POST'])
def add_booking():
    request_data = request.get_json()
    x = list(request_data.keys())
    key = x[0]
    with shelve.open("buchungen.db") as buchungen:
        if key not in buchungen:
            buchungen[key] = request_data[key]
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


# Controller for Accounts
@app.route('/api/konten/<kontosnummer>', methods=['GET'])
def get_account(kontosnummer):
    dic = {}
    with shelve.open("konten.db") as konten:
        if kontosnummer in konten:
            dic[kontosnummer] = konten[kontosnummer]
        return render_template("account.html", data=dic)


@app.route("/api/konten/all", methods=['GET'])
def get_all_accounts():
    dic = {}
    with shelve.open("konten.db") as konten:
        for key in konten:
            dic[key] = konten[key]
        # return render_template("account.html", data=dic)
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
            return "Konto konnte nicht erstellt werden"


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


@app.route("/about")
def about():
    return render_template('about.html', title='About')


if __name__ == '__main__':
    app.run(debug=True)
