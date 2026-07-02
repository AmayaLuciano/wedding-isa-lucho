/**
 * Web App para la lista de regalos de la boda.
 * Vive dentro de la planilla de Google (Extensiones → Apps Script).
 *
 * - GET  → devuelve todos los regalos como JSON.
 * - POST → reserva un regalo: { id, reservado_por }. Solo reserva si está libre.
 *
 * La pestaña debe llamarse "Regalos" y tener estos encabezados en la fila 1:
 *   id | nombre | descripcion | link | imagen | precio | reservado | reservado_por
 */

const SHEET_NAME = "Regalos";

function doGet() {
  return json(readGifts());
}

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad_request" });
  }

  var id = String(data.id || "").trim();
  var reservadoPor = String(data.reservado_por || "").trim();
  if (!id || !reservadoPor) {
    return json({ ok: false, error: "bad_request" });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita reservas simultáneas del mismo regalo
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    var values = sheet.getDataRange().getValues();
    var headers = values[0].map(function (h) {
      return String(h).trim().toLowerCase();
    });
    var idCol = headers.indexOf("id");
    var resCol = headers.indexOf("reservado");
    var porCol = headers.indexOf("reservado_por");

    for (var i = 1; i < values.length; i++) {
      if (String(values[i][idCol]).trim() === id) {
        var yaReservado =
          values[i][resCol] === true ||
          String(values[i][resCol]).toUpperCase() === "TRUE";
        if (yaReservado) {
          return json({ ok: false, error: "ya_reservado" });
        }
        sheet.getRange(i + 1, resCol + 1).setValue(true);
        sheet.getRange(i + 1, porCol + 1).setValue(reservadoPor);
        return json({ ok: true });
      }
    }
    return json({ ok: false, error: "no_encontrado" });
  } finally {
    lock.releaseLock();
  }
}

function readGifts() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var values = sheet.getDataRange().getValues();
  var headers = values.shift().map(function (h) {
    return String(h).trim().toLowerCase();
  });
  var idCol = headers.indexOf("id");

  return values
    .filter(function (r) {
      return String(r[idCol]).trim() !== "";
    })
    .map(function (r) {
      var o = {};
      headers.forEach(function (h, i) {
        o[h] = r[i];
      });
      return {
        id: String(o.id),
        nombre: String(o.nombre || ""),
        descripcion: o.descripcion ? String(o.descripcion) : null,
        link: o.link ? String(o.link) : null,
        imagen: o.imagen ? String(o.imagen) : null,
        precio:
          o.precio === "" || o.precio === null || o.precio === undefined
            ? null
            : Number(o.precio),
        reservado:
          o.reservado === true || String(o.reservado).toUpperCase() === "TRUE",
        reservado_por: o.reservado_por ? String(o.reservado_por) : null,
      };
    });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
