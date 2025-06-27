import { AfipService } from "./afip.service";
import { IWsfexSoap, WsfexSoapTypes } from "../soap/interfaces/WSFEX/WsfexSoap";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import { Context } from "../types";
import { EndpointsEnum } from "../enums";

export interface IExportVoucher extends WsfexSoapTypes.IFEXRequest {}

export interface ICreateExportVoucherResult {
  response: WsfexSoapTypes.IFEXResponse;
  cae?: string;
  caeFchVto?: string;
}

export class ExportBillingService extends AfipService<IWsfexSoap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSFEXV1,
      url_test: EndpointsEnum.WSFEXV1_TEST,
      wsdl: WsdlPathEnum.WSFEX,
      wsdl_test: WsdlPathEnum.WSFEX_TEST,
      serviceName: ServiceNamesEnum.WSFEX,
      v12: false,
    });
  }

  /**
   * Asks to web service for servers status
   *
   * @return object { AppServer : Web Service status,
   * DbServer : Database status, AuthServer : Authentication
   * server status}
   **/
  async getServerStatus(): Promise<WsfexSoapTypes.IFEXDummyOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXDummyAsync({});
    console.log(await client.FEXDummyAsync({}));
    return output;
  }

  /**
   * Create an export voucher from AFIP
   *
   * Send to AFIP servers request for create an export voucher and assign
   * CAE to them
   *
   * @param req Export voucher parameters
   **/
  public async createExportVoucher(
    req: IExportVoucher
  ): Promise<ICreateExportVoucherResult> {
    const client = await this.getClient();
    const [output] = await client.FEXAuthorizeAsync({
      Cmp: req,
    });

    const response = output.FEXAuthorizeResult;

    return {
      response: response!,
      cae: response?.FEXResultAuth?.Cae,
      caeFchVto: response?.FEXResultAuth?.Fch_vto_cae,
    };
  }

  /**
   * Alias for createExportVoucher method.
   */
  async createExportInvoice(
    req: IExportVoucher
  ): Promise<ICreateExportVoucherResult> {
    return this.createExportVoucher(req);
  }
}
