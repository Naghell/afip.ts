import { Client } from "soap";

export namespace WsfexSoapTypes {
  export interface IFEXAuthRequest {
    Token?: string;
    Sign?: string;
    Cuit: number;
  }

  export interface IDummyResponse {
    AppServer?: string;
    DbServer?: string;
    AuthServer?: string;
  }

  export interface IItem {
    Pro_codigo?: string;
    Pro_ds?: string;
    Pro_qty: number;
    Pro_umed?: number;
    Pro_precio_uni: number;
    Pro_total_item: number;
  }

  export interface ICmpAsoc {
    Cbte_tipo: number;
    Cbte_punto_vta: number;
    Cbte_nro: number;
  }

  export interface IFEXRequest {
    Id: number;
    Fecha_cbte: string;
    Cbte_Tipo: number;
    Punto_vta: number;
    Cbte_nro: number;
    Tipo_expo: number;
    Permiso_existente: string;
    Dst_cmp?: number;
    Cliente?: string;
    Cuit_pais_cliente?: string;
    Domicilio_cliente?: string;
    Id_impositivo: string;
    Moneda_Id: string;
    Moneda_ctz: number;
    Obs_comerciales?: string;
    Obs_generales?: string;
    Forma_pago?: string;
    Incoterms?: string;
    Incoterms_Ds?: string;
    Imp_total: number;
    Items?: IItem[];
    Cmps_asoc?: ICmpAsoc[];
  }

  export interface IEvt {
    Code: number;
    Msg?: string;
  }

  export interface IErr {
    Code: number;
    Msg?: string;
  }

  export interface IFEXResult {
    Id: number;
    Fecha_cbte?: string;
    Cbte_Tipo: number;
    Punto_vta: number;
    Cbte_nro: number;
    Resultado?: string;
    Motivos_obs?: string;
    Err_code?: number;
    Err_msg?: string;
    Reproceso?: string;
    Cae?: string;
    Fch_vto_cae?: string;
  }

  export interface IFEXResponse {
    FEXResultAuth?: IFEXResult;
    Events?: IEvt[];
    Errors?: IErr[];
  }

  export interface IFEXDummyOutput {
    FEXDummyResult?: IDummyResponse;
  }

  export interface IFEXAuthorizeOutput {
    FEXAuthorizeResult?: IFEXResponse;
  }
}

export interface IWsfexSoap extends Client {
  FEXDummyAsync(args: { Auth?: WsfexSoapTypes.IFEXAuthRequest }): Promise<[WsfexSoapTypes.IFEXDummyOutput, string, any, string]>;
  
  FEXAuthorizeAsync(args: { 
    Auth?: WsfexSoapTypes.IFEXAuthRequest;
    Cmp?: WsfexSoapTypes.IFEXRequest;
  }): Promise<[WsfexSoapTypes.IFEXAuthorizeOutput, string, any, string]>;
} 