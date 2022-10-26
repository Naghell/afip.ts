import {
  IFECAESolicitarOutput,
  IFEParamGetPtosVentaOutput,
  ServiceSoapTypes,
} from "./../soap/interfaces/Service/ServiceSoap";
import { ILoginCmsReturn } from "../soap/interfaces/LoginCMSService/LoginCms";
import { WSAuthTokens } from "../auth/types";

export interface IAccessTicket extends ILoginCmsReturn {
  getSign(): string;
  getToken(): string;
  getExpiration(): Date;
  getAuthKeyProps(): WSAuthTokens;
  isAccessTicketValid(ta: IAccessTicket): boolean;
}

export interface IVoucher {
  CantReg: number;
  PtoVta: number;
  CbteTipo: number;
  Concepto: number;
  DocTipo: number;
  DocNro: number;
  CbteDesde: number;
  CbteHasta: number;
  CbteFch: string;
  ImpTotal: number;
  ImpTotConc: number;
  ImpNeto: number;
  ImpOpEx: number;
  ImpIVA: number;
  ImpTrib: number;
  FchServDesde?: string;
  FchServHasta?: string;
  FchVtoPago?: string;
  MonId: string;
  MonCotiz: number;
  CbtesAsoc?: ICbtesAsoc[];
  Tributos?: ITributo[];
  Iva?: IIva[];
  Opcionales?: IOpcional[];
  Compradores?: IComprador[];
}

export interface ICbtesAsoc {
  Tipo: number;
  PtoVta: number;
  Nro: number;
  Cuit: string;
  CbteFch?: string;
}

export interface IComprador {
  DocTipo: number;
  DocNro: number;
  Porcentaje: number;
}

export interface IIva {
  Id: number;
  BaseImp: number;
  Importe: number;
}

export interface IOpcional {
  Id: string;
  Valor: string;
}

export interface ITributo {
  Id: number;
  Desc: string;
  BaseImp: number;
  Alic: number;
  Importe: number;
}

export interface ICreateVoucherResult {
  response: IFECAESolicitarOutput;
  cae: string;
  caeFchVto: string;
}

export interface IGetSalesPointsResult extends IFEParamGetPtosVentaOutput {}
