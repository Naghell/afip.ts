# 🏢 CUIT Representado

## ¿Qué es el CUIT Representado?

El CUIT representado es una funcionalidad que permite facturar a nombre de otra persona o empresa cuando tienes permisos delegados para hacerlo. Esto es común en escenarios como:

- **Contadores**: Que facturan a nombre de sus clientes
- **Sistemas de gestión**: Que manejan múltiples empresas
- **Servicios de facturación**: Que operan en nombre de terceros

## Cómo funciona

1. **Autenticación**: Se autentica con el CUIT de tu empresa (el que tiene el certificado)
2. **Operaciones**: Se realizan las operaciones (como crear facturas) a nombre del CUIT representado
3. **Permisos**: El CUIT representado debe haber delegado permisos al CUIT autenticado

## Configuración

Para usar CUIT representado, simplemente agrega el campo `representedCuit` al contexto:

```ts
import { Afip } from "afip.ts";

const afip = new Afip({
  key: "tu_clave_privada",
  cert: "tu_certificado",
  cuit: 20111111112, // CUIT de tu empresa (autenticación)
  representedCuit: 20333333334, // CUIT representado (operaciones)
});
```

## Ejemplo Completo

```ts
import { Afip } from "afip.ts";

// Configuración con CUIT representado
const afip = new Afip({
  key: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
  cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  cuit: 20111111112, // Mi empresa
  representedCuit: 20333333334, // Cliente con permisos delegados
});

// Crear factura a nombre del CUIT representado
const factura = await afip.electronicBillingService.createInvoice({
  CantReg: 1,
  PtoVta: 1,
  CbteTipo: 1, // Factura A
  Concepto: 1,
  DocTipo: 80, // CUIT
  DocNro: 20333333334, // CUIT del cliente
  CbteDesde: 1,
  CbteHasta: 1,
  CbteFch: "20231201",
  ImpTotal: 1210,
  ImpTotConc: 1000,
  ImpNeto: 1000,
  ImpOpEx: 0,
  ImpIVA: 210,
  ImpTrib: 0,
  MonId: "PES",
  MonCotiz: 1,
  CondicionIVAReceptorId: 1,
  Iva: [
    {
      Id: 5, // 21%
      BaseImp: 1000,
      Importe: 210,
    },
  ],
});

console.log("CAE:", factura.cae);
console.log("Vencimiento CAE:", factura.caeFchVto);
```

## Consideraciones Importantes

1. **Permisos Delegados**: El CUIT representado debe haber delegado permisos al CUIT autenticado en AFIP
2. **Certificados**: Los certificados deben pertenecer al CUIT de autenticación
3. **Responsabilidad**: Las facturas se crean a nombre del CUIT representado, pero la responsabilidad legal recae en ambos
4. **Auditoría**: Todas las operaciones quedan registradas con ambos CUITs

## Servicios Compatibles

El CUIT representado funciona con todos los servicios que requieren autenticación:

- ✅ Facturación Electrónica
- ✅ Padrón A4
- ✅ Padrón A5
- ✅ Padrón A10
- ✅ Padrón A13
- ✅ Prueba de Inscripción

## Verificación

Para verificar que el CUIT representado está funcionando correctamente, puedes revisar los logs de AFIP o consultar el estado del servidor:

```ts
// Verificar estado del servidor
const status = await afip.electronicBillingService.getServerStatus();
console.log("Estado del servidor:", status);

// Obtener puntos de venta del CUIT representado
const puntosVenta = await afip.electronicBillingService.getSalesPoints();
console.log("Puntos de venta:", puntosVenta);
``` 