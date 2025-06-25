# 🚀 Uso Básico

### Ejemplo Básico

Para utilizar la SDK, debes instanciar la clase `Afip` proporcionando los siguientes datos mínimos:

- [`key`](https://www.afip.gob.ar/ws/documentacion/certificados.asp): Contenido de la clave privada generada para AFIP.
- [`cert`](https://www.afip.gob.ar/ws/documentacion/certificados.asp): Contenido del certificado generado en AFIP.
- `cuit`: CUIT del usuario.

Esto resultará en la creación de un objeto con los servicios disponibles para su uso, como por ejemplo `electronicBillingService`:

```ts:line-numbers
import { Afip } from "afip.ts";

const afip: Afip = new Afip({
  key: "contenido_de_la_clave_privada",
  cert: "contenido_del_certificado",
  cuit: 20111111112,
});

const factura = await afip.electronicBillingService.createInvoice({
  // datos de la factura
});
```

### Ejemplo con CUIT Representado

Para facturar a nombre de otra persona con permisos delegados, puedes usar el campo `representedCuit`:

```ts:line-numbers
import { Afip } from "afip.ts";

// CUIT de tu empresa (para autenticación)
const miCuit = 20111111112;
// CUIT de la persona a nombre de quien facturas (con permisos delegados)
const cuitRepresentado = 20333333334;

const afip: Afip = new Afip({
  key: "contenido_de_la_clave_privada",
  cert: "contenido_del_certificado",
  cuit: miCuit, // CUIT para autenticación
  representedCuit: cuitRepresentado, // CUIT representado para facturación
});

// Ahora las facturas se crearán a nombre del representedCuit
const factura = await afip.electronicBillingService.createInvoice({
  // datos de la factura
});
```

La clase `Afip` acepta un parámetro adicional en el constructor llamado "contexto" (ver tipo). Aquí se explican todos los comportamientos que puede tomar Afip.