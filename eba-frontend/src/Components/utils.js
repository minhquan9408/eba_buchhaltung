import autoTable from "jspdf-autotable";

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

export function renderRowForAccountPDF(doc, title, konten) {
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
      autoTable(doc, {
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
  if (!!allAccounts) {
    for (const account in allAccounts) {
      if (allAccounts.hasOwnProperty(account)) {
        const konto = allAccounts[account]
        if (account >= min && account < max)
          newKonto.push(konto)
      }
    }
  }
  return newKonto
}

//Utilities for Summen und Saldenlisten
export function prepareColumnsForSummenSaldenListe() {
  return [
    {
      title: 'Konto',
      dataIndex: 'Kontonummer',
      key: 'Kontonummer',
    }, {
      title: 'Kontobezeichnung',
      dataIndex: 'Beschreibung',
      key: 'Beschreibung',
    },
    {
      title: 'Er\u00F6ffnungsbilanzwerte',
      children: [
        {
          title: "Aktiva",
          dataIndex: 'EroeffnungsbilanzSollWert',
          key: 'EroeffnungsbilanzSollWert',
          align: 'right',
        },
        {
          title: "Passiva",
          dataIndex: 'EroeffnungsbilanzHabenWert',
          key: 'EroeffnungsbilanzHabenWert',
          align: 'right',
        }
      ]
    },
    {
      title: 'Summe f\u00FCr Jahr',
      children: [
        {
          title: "Soll",
          dataIndex: 'JahresverkehrszahlenSollWert',
          key: 'JahresverkehrszahlenSollWert',
          align: 'right',
        },
        {
          title: "Haben",
          dataIndex: 'JahresverkehrszahlenHabenWert',
          key: 'JahresverkehrszahlenHabenWert',
          align: 'right',
        }
      ]
    },
    {
      title: 'Summe per 31.12',
      children: [
        {
          title: "Soll",
          dataIndex: 'JahresverkehrszahlenSollWert',
          key: 'JahresverkehrszahlenSollWert',
          align: 'right',
        },
        {
          title: "Haben",
          dataIndex: 'JahresverkehrszahlenHabenWert',
          key: 'JahresverkehrszahlenHabenWert',
          align: 'right',
        }
      ]
    },
    {
      title: 'Saldo per 31.12',
      children: [
        {
          title: "Soll",
          dataIndex: 'SaldoSoll',
          key: 'SaldoSoll',
          align: 'right',
        },
        {
          title: "Haben",
          dataIndex: 'SaldoHaben',
          key: 'SaldoHaben',
          align: 'right',
        }
      ]
    },
  ]
}

export function prepareDataSourceForTable(dataSource,
                                          konten,
                                          stringForTitle,
                                          shouldAddEmptyRow,
                                          shouldAddAccount,
                                          shouldAddTitle
) {
  const titleRow = {
    "Kontonummer": " ",
    "Beschreibung": stringForTitle,
    "EroeffnungsbilanzSollWert": "",
    "EroeffnungsbilanzHabenWert": "",
    "JahresverkehrszahlenSollWert": "",
    "JahresverkehrszahlenHabenWert": "",
    "SaldoSoll": "",
    "SaldoHaben": "",
  }
  if (shouldAddTitle) dataSource.push(titleRow)
  let sumJVKSoll = 0
  let sumJVKHaben = 0
  let sumSaldoSoll = 0
  let sumSaldoHaben = 0
  let sumEBWSoll = 0
  let sumEBWHaben = 0

  for (const kontoKey in konten) {
    if (konten.hasOwnProperty(kontoKey))
      if (Object.keys(konten[kontoKey]).includes("Buchungen", 0))
        if (Object.keys(konten[kontoKey]["Buchungen"]).length > 0) {
          const jvkSoll = parseFloat(konten[kontoKey]["JahresverkehrszahlenSollWert"])
          sumJVKSoll += jvkSoll
          const jvkHaben = parseFloat(konten[kontoKey]["JahresverkehrszahlenHabenWert"])
          sumJVKHaben += jvkHaben
          const saldoSoll = parseFloat(konten[kontoKey]["SaldoSoll"])
          sumSaldoSoll += saldoSoll
          const saldoHaben = parseFloat(konten[kontoKey]["SaldoHaben"])
          sumSaldoHaben += saldoHaben
          const EBWSoll = parseFloat(konten[kontoKey]["EroeffnungsbilanzSollWert"])
          sumEBWSoll += EBWSoll
          const EBWHaben = parseFloat(konten[kontoKey]["EroeffnungsbilanzHabenWert"])
          sumEBWHaben += EBWHaben
          if (shouldAddAccount) dataSource.push(konten[kontoKey])
        }
  }
  const summe = {
    "Kontonummer": "Summe",
    "Beschreibung": "",
    "EroeffnungsbilanzSollWert": sumEBWSoll.toFixed(2),
    "EroeffnungsbilanzHabenWert": sumEBWHaben.toFixed(2),
    "JahresverkehrszahlenSollWert": sumJVKSoll.toFixed(2),
    "JahresverkehrszahlenHabenWert": sumJVKHaben.toFixed(2),
    "SaldoSoll": sumSaldoSoll.toFixed(2),
    "SaldoHaben": sumSaldoHaben.toFixed(2),
  }
  const emptyRow = {
    "Kontonummer": "",
    "Beschreibung": "",
    "EroeffnungsbilanzSollWert": "",
    "EroeffnungsbilanzHabenWert": "",
    "JahresverkehrszahlenSollWert": "",
    "JahresverkehrszahlenHabenWert": "",
    "SaldoSoll": "",
    "SaldoHaben": "",
  }

  dataSource.push(summe)
  if (shouldAddEmptyRow) dataSource.push(emptyRow)
}

export function prepareHeaderForSummenSaldenliste() {
  return [
    [
      {content: ' ', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      {content: 'Er\u00F6ffnungsbilanzwerte', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      {content: 'Summe f\u00FCr Jahr', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      {content: 'Summe per 31.12', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      {content: 'Saldo per 31.12', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
    ],
    [
      'Konto',
      'Kontobezeichnung',
      'Aktiva',
      'Passiva',
      'Soll',
      'Haben',
      'Soll',
      'Haben',
      'Soll',
      'Haben',
    ],
  ];
}

function createTablePDF(doc, title, head, body) {
  doc.text(`Summen- und Saldenliste ${title}`, 10, 10)
  body = body.map((row) => [
    row.Kontonummer,
    row.Beschreibung,
    row.EroeffnungsbilanzSollWert,
    row.EroeffnungsbilanzHabenWert,
    row.JahresverkehrszahlenSollWert,
    row.JahresverkehrszahlenHabenWert,
    row.JahresverkehrszahlenSollWert,
    row.JahresverkehrszahlenHabenWert,
    row.SaldoSoll,
    row.SaldoHaben
  ])

  autoTable(doc, {
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
}

export function exportSummenSaldenliste(doc, konten, title) {
  const head = prepareHeaderForSummenSaldenliste()
  let body = []
  prepareDataSourceForTable(
    body,
    konten,
    "",
    false,
    true,
    false
  )
  createTablePDF(doc, title, head, body)

}

export function exportSummenSaldenlisteSachkonten(doc, konten, title) {
  const head = prepareHeaderForSummenSaldenliste()
  let body = []
  body = konten
  createTablePDF(doc, title, head, body)
}

