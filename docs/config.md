# ⚙️ Contexto

### Contexto de Afip:

La clase `Afip` recibe un objeto de tipo `Context` como parámetro, el cual proporciona los datos básicos necesarios para utilizar los servicios web de AFIP, así como también cómo deben comportarse:

```ts
const instancia = new Afip(Contexto);
```

- `Contexto`:
  - `production` <small>(booleano)</small>: Flag que permite especificar si se utilizarán los servicios de producción o de homologación (pruebas).
  - `cert` <small>\*(cadena)</small>: Contenido del certificado `(.crt)`.
  - `key` <small>\*(cadena)</small>: Contenido de la llave privada.
  - `cuit` <small>\*(número)</small>: CUIT del usuario que se utilizará para la autenticación.
  - `representedCuit` <small>(número)</small>: CUIT representado para operaciones delegadas (ej: facturación a nombre de otra persona). Si no se especifica, se usará el CUIT de autenticación.
  - `credentials` <small>(WSAuthTokens)</small>: Un objeto de tipo WSAuthTokens ([Ver](https://github.com/valiulab/afip.ts/blob/main/src/auth/types.ts#L5)). Aquí es donde se asignan los tokens de autenticación si ya se tienen guardados.
  - `handleTicket` <small>(booleano)</small>: Flag que indica si los tickets de autenticación son gestionados automáticamente por el paquete o si serán proporcionados por el desarrollador (más adelante se explicará cómo hacer inicio de sesión y luego pasar los tokens antes de llamar al servicio web deseado). Esto es útil cuando se desea utilizar el paquete en una función `lambda` o en algun lugar que no se tenga almacenamiento.
  - `ticketPath` <small>(cadena)</small>: La ruta preferida donde se desean guardar los tokens obtenidos del servicio WSAA si no se desea utilizar la carpeta predeterminada.

<br/>
Context Type:

```ts
type Context = {
  /**
   * Flag for production or testing environment
   *
   * @var boolean
   **/
  production?: boolean;

  /**
   * Content file for the X.509 certificate in PEM format
   *
   * @var string
   **/
  cert: string;

  /**
   * Content file for the private key corresponding to CERT (PEM)
   *
   * @var string
   **/
  key: string;

  /**
   * The CUIT to use for authentication
   *
   * @var int
   **/
  cuit: number;

  /**
   * The CUIT to use for represented operations (e.g., billing on behalf of another entity)
   * If not provided, will use the authentication CUIT
   *
   * @var int
   **/
  representedCuit?: number;

  /**
   * Tokens object if you have one created before
   *
   * @var credentials
   **/
  credentials?: ILoginCredentials;

  /**
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * The path of the auth obj if the package is auto managed
   */
  ticketPath?: string;
};
```

<br>