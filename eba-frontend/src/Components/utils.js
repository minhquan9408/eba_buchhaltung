export function prepareRowBookingForAccount(konto) {
  let buchungen = konto["Buchungen"]
  let data = []
  let sumSollBetrag = 0
  let sumHabenBetrag = 0
  for (const buchung in buchungen) {
    if (buchungen.hasOwnProperty(buchung)) {
      data.push(buchungen[buchung])
      let sollBetrag = parseFloat(buchungen[buchung]["SollBetragMitSteuer"])
      let habenBetrag = parseFloat(buchungen[buchung]["HabenBetragMitSteuer"])
      if (!isNaN(sollBetrag)) sumSollBetrag += sollBetrag
      if (!isNaN(habenBetrag)) sumHabenBetrag += habenBetrag
    }
  }
  const summary = {
    "Beschreibung": "",
    "Betrag": "",
    "Buchungsdatum": "Summe",
    "Buchungsnummer": "",
    "Buchungsschluessel": "",
    "Buchungstext": "",
    "GegenKonto": "",
    "HabenBetragMitSteuer": sumHabenBetrag.toFixed(2),
    "HabenKonto": "",
    "HabenSteuerBetrag": "",
    "HabenSteuerKonto": "",
    "SollBetragMitSteuer": sumSollBetrag.toFixed(2),
    "SollKonto": "",
    "SollSteuerBetrag": "",
    "SollSteuerKonto": "",
    "Steuerkonto": "",
  }
  data.push(summary)
  return data
}

export function renderRowForAccountPDF (doc, title, konten) {
  const head = [
      [
        {content: ' ', colSpan: 4, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: 'Betrag', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: ' ', colSpan: 1, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      ],
      [
        'Datum',
        'Beleg Nr.',
        'Buchungstext',
        'Gegenkonto',
        'Soll',
        'Haben',
        'USt-Konto',
      ],
    ];
  const marginLeft = 10
  doc.text(title, marginLeft, 5)
  konten.map((konto) => {
      let data = prepareRowBookingForAccount(konto)
      const body = data.map((row) => [
        row.Buchungsdatum,
        row.Buchungsschluessel,
        row.Beschreibung,
        row.GegenKonto,
        row.SollBetragMitSteuer,
        row.HabenBetragMitSteuer,
        row.Steuerkonto,
      ])
      if (data.length > 1) {
        doc.autoTable({
          startY: 15,
          head: head,
          body: body,
          theme: 'grid',
          didParseCell: function (data) {
            let rows = data.table.body;
            if (data.row.index === rows.length - 1) {
              data.cell.styles.fontStyle = "bold"
              data.cell.styles.fontSize = 12
            }
          }
        });
        const kontoName = `Konto ${konto["Kontonummer"]} - ${konto["Kontoname"]}`
        doc.text(kontoName, marginLeft, 10)
        doc.addPage()
      }
    })
}

export function prepareAccount(min, max, allAccounts) {
  let newKonto = []
  if (!!allAccounts){
    for (const account in allAccounts){
      const konto = allAccounts[account]
      if (account > min && account < max)
        newKonto.push(konto)
    }
  }
  return newKonto
}